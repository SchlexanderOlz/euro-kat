from bs4 import BeautifulSoup
from bs4.element import ResultSet
import urllib.parse
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

    @staticmethod
    def get_html_content(path: str) -> tuple[str, bool, str, set[bytes]]:
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

            # This gets all elements in the HTML which are not a non-breaking space (&nbsp)
            # They then get replaced by ??? just for simplified output
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
                if i == 2:
                    if content == '"':
                        content = last_serial
                    else:
                        last_serial = content
                    continue
                if i == 0:
                    figure_name = content.strip()

                tmp.append(content)
            link: str = element.find('a')

            if link:
                tmp.append(InformationExtractor.get_figure_content(InformationExtractor.__join_paths(link.get('href'), os.path.dirname(path)), figure_name))
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
                    b_image: bytes = InformationExtractor.get_image(href, "../" + image)
                    b_images.add(b_image)

                del images

                kennung = InformationExtractor.__cleanup(found_element.find_next('td').find_next('td').find_next('td').get_text(strip=True))
                aufkleber = InformationExtractor.__cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True)) != "keine Aufkleber"
                note = InformationExtractor.__cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True))
                values = (kennung, aufkleber, note)  # TODO b_images needs to be added as the last element. For debugging purposes (and readability of ouput) it was temporarily removed
                break

        if not values:
            InformationExtractor.__display_info(MessageType.WARNING, f"""No values could be found! There could be a potential error in file: {Fore.BLUE}{href}{Style.RESET_ALL} -> In search for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")
        return values

    @staticmethod
    def get_image(wd_path: str, rel_path: str) -> bytes:
        """
        Retrieves the binary content of an image file.

        Args:
            wd_path (str): The working directory path.
            rel_path (str): The relative path to the image file.

        Returns:
            bytes: The binary content of the image file.
        """
        path: str = urllib.parse.unquote(InformationExtractor.__join_paths(rel_path, wd_path))
        with open(path, 'rb') as file:
            return file.read()

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
