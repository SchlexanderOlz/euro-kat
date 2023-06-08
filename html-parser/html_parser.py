from bs4 import BeautifulSoup
from bs4.element import ResultSet
from colorama import init, Fore, Style
from enum import Enum
import threading
import os

init(autoreset=True)

LOCK = threading.Lock()


class MessageType(Enum):
    ERROR = 0,
    WARNING = 1,
    INFO = 2


# TODO
# --> Some checks are missing
#   -> f.e. Values which only consist of ???'s or "empty" values need to be removed
# --> Packageinserts are not processed currently
class InformationExtractor:
    """
    A class for extracting information from HTML files using BeautifulSoup.
    """

    # TODO -> Method is execting get_series_info to often
    # Should only be called for each series and not each figure
    # Can be made more efficient by calling the get_figure_content only for each
    # series (function also needs to be rewritten then)
    @staticmethod
    def get_html_content(path: str) -> tuple[tuple[str, bool, str, set[bytes]], tuple[str, list[tuple[str, str, str, set[bytes]]]]]:
        """
        Retrieves the HTML content from a file and returns a tuple with the extracted information.

        Args:
            path (str): The path to the HTML file.

        Returns:
            tuple[str, bool, str, set[bytes]]: A tuple containing the extracted information.
        """

        def replace_nbsp_elements(html) -> str:
            """
            Replaces non-breaking space elements in the HTML with placeholder text.

            Returns:
                str: The HTML content with non-breaking space elements replaced.
            """
            soup = BeautifulSoup(html, 'html.parser')
            for element in soup.find_all(text=lambda t: t == '\xa0'):
                element.replace_with('???')
            return str(soup)


        html: str = ""
        with open(path) as file:
            html = file.read()

        soup = BeautifulSoup(replace_nbsp_elements(html), 'html.parser')
        del html

        tr_elements: ResultSet[any] = soup.find_all('tr')

        last_serial: str = "Error Value!!!!"
        elements: list = []
        for element in tr_elements:
            tmp = []
            figure_name: str
            for i, td in enumerate(element.find_all('td')):
                content = InformationExtractor.__cleanup(td.get_text(strip=True))

                match i:
                    case 0:
                        figure_name = content.strip()
                    case 2:
                        if content == '"':
                            content = last_serial
                        else:
                            last_serial = content

                tmp.append(content)
            link: str = element.find('a')

            if link:
                absolut_path: str = InformationExtractor.__join_paths(link.get('href'), os.path.dirname(path))
                tmp.append(InformationExtractor.get_series_info(absolut_path))
                tmp.append(InformationExtractor.get_figure_content(absolut_path, figure_name))
            elements.append(tmp)

        return elements

    @staticmethod
    def get_figure_content(href: str, figure_id: str) -> tuple[str, bool, str, set[bytes]]:
        """
        Retrieves the content of a specific figure from an HTML file and returns a tuple with the extracted information.

        Args:
            href (str): The path to the HTML file containing the figure.
            figure_id (str): The ID of the figure to extract.

        Returns:
            tuple[str, bool, str, set[bytes]]: A tuple containing the extracted information.
        """
        html: str = ""
        with open(href) as file:
            html = file.read()
        soup = BeautifulSoup(html, 'html.parser')
        del html

        figure_tr: ResultSet[any] = soup.find_all('tr')

        values: tuple = ()
        for tr in figure_tr:
            found_element = tr.find('b', string=lambda text: text and text.strip().lower() == figure_id.lower())
            if found_element:
                images: list = None
                images = [element.get('src') for element in tr.find_all('img') if element]

                if len(images) == 0:
                    InformationExtractor.__display_info(MessageType.WARNING, f"""No Image found for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")

                b_images: set[bytes] = set()
                for image in images:
                    absolut_path: str = InformationExtractor.__join_paths("../" + image, href)
                    b_image: bytes = InformationExtractor.get_image(absolut_path)
                    b_images.add(b_image)
                del images

                kennung: str = InformationExtractor.__cleanup(found_element.find_next('td').find_next('td').find_next('td').get_text(strip=True))
                aufkleber: bool = InformationExtractor.__cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True)) != "keine Aufkleber"
                note: str = InformationExtractor.__cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True))
                values: tuple[str, bool, str, bytes] = (kennung, aufkleber, note, "!!!Here should be an image!!!")  # TODO b_images needs to be added as the last element. For debugging purposes (and readability of ouput) it was temporarily removed
                break

        if not values:
            InformationExtractor.__display_info(MessageType.WARNING, f"""No values could be found! There could be a potential error in file: {Fore.BLUE}{href}{Style.RESET_ALL} -> In search for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")
        return values

    @staticmethod
    def get_image(path: str) -> bytes:
        """
        Retrieves the binary content of an image file.

        Args:
            wd_path (str): The working directory path.
            rel_path (str): The relative path to the image file.

        Returns:
            bytes: The binary content of the image file.
        """
        try:
            with open(path, 'rb') as file:
                return file.read()
        except FileNotFoundError:
            InformationExtractor.__display_info(MessageType.ERROR, f"""File: {Fore.BLUE}{path}{Style.RESET_ALL} could not be found!""")

    @staticmethod
    def get_series_info(href: str) -> tuple[str, list[tuple[str, str, str, set[bytes]]]]:
        html: str
        with open(href) as file:
            html = file.read()
        
        soup = BeautifulSoup(html, 'html.parser')
        b_text = soup.find_all('b')

        cv_info: list[tuple[str, str, str, set[bytes]]] = None
        for text in b_text:
            if "Beipackzettel" in text.get_text(strip=True):
                found = text.find_next('a')

                if found:
                    link = found.get('href')
                    absolut_path: str = InformationExtractor.__join_paths('../' + link, href)
                    cv_info = InformationExtractor.get_country_variation_info(absolut_path)
        
        if not cv_info:
            # NOTE Look at error message 2
            InformationExtractor.__display_info(MessageType.WARNING, f"""No packageinsert information could be retrieved for {Fore.BLUE}{href}{Style.RESET_ALL}""")
            InformationExtractor.__display_info(MessageType.INFO, f"""Information for dev's: The function which handles direct package-inserts needs to be implemented and then called instead of this message""")

        def get_thanks_msg() -> str:
            font_element = soup.find('div', align='center')
            names: str = font_element.get_text(strip=True)

            thanks_begin: int = names.find('Dank')
            thanks_end: int = names.find('!') # This could be a potential error source
            thankings: str = names[thanks_begin:thanks_end] + "!"
            thankings = InformationExtractor.__cleanup(thankings)
            
            if not thankings:
                InformationExtractor.__display_info(MessageType.WARNING, f"""No "thank you" message found in {Fore.BLUE}{href}{Style.RESET_ALL}""")
            return thankings

        return (get_thanks_msg(), cv_info)


    @staticmethod
    def get_country_variation_info(href: str) -> list[tuple[str, str, str, set[bytes]]]:
        html: str = ""
        with open(href) as file:
            html = file.read()
        
        soup = BeautifulSoup(html, 'html.parser')
        tr_elements: ResultSet[BeautifulSoup] = soup.find_all('tr')

        bpz_index: int = 1
        informations: list = []
        for tr in tr_elements:
            td: BeautifulSoup = tr.find('td')
            try:
                if int(td.get_text(strip=True)) == bpz_index:
                    bpz_index += 1
                    
                    pictures = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_all('img')

                    images: set[bytes] = set()
                    for img in pictures:
                        source: str = img.get('src')
                        absolut_path: str = InformationExtractor.__join_paths("../" + source, href)
                        image: bytes = InformationExtractor.get_image(absolut_path)
                        images.add(image)

                    country, year = tr.find_next('tr').get_text(strip=True).split('-')
                    note: str = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').get_text(strip=True)
                    
                    note = InformationExtractor.__cleanup(note)
                    country = InformationExtractor.__cleanup(country)
                    year = InformationExtractor.__cleanup(year)

                    if country is None and year is None and note is None:
                        InformationExtractor.__display_info(MessageType.WARNING, f"""The PackageInsert at {Fore.YELLOW}{href}{Style.RESET_ALL} could not be correct! (No values found)""")
                    informations.append((country, year, note, "!!!Here should be an image!!!")) # NOTE -> Add the images variable as a return-type here
            except ValueError:
                pass
        return informations

    @staticmethod
    def __cleanup(val: str):
        """
        Removes unwanted characters from a string
        """
        return val.replace('\n', '').replace('\t', '')

    @staticmethod
    def __join_paths(relative_path: str, other_path: str) -> str:
        """
        Joins two paths together.

        Args:
            relative_path (str): The relative path.
            other_path (str): The other path.

        Returns:
            str: The joined path.
        """
        joined_path: str = os.path.normpath(os.path.join(other_path, relative_path))
        return joined_path

    @staticmethod
    def __display_info(message_type: MessageType, message: str) -> None:
        """
        Displays a formatted message of a specific message type.

        Args:
            message_type (MessageType): The type of the message (ERROR, WARNING, INFO).
            message (str): The message content.
        """
        with LOCK:
            begin: str
            match message_type:
                case MessageType.ERROR:
                    begin = f"""{Fore.RED}[-] ERROR!{Style.RESET_ALL}:"""
                case MessageType.WARNING:
                    begin = f"""{Fore.YELLOW}[~] WARNING!{Style.RESET_ALL}:"""
                case MessageType.INFO:
                    begin = f"""{Fore.BLUE}[*] INFO {Style.RESET_ALL}:"""

            print(begin + message)
