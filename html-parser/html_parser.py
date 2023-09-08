from bs4 import BeautifulSoup
from bs4.element import ResultSet
from colorama import init, Fore, Style
from enum import Enum
import threading
import os
import re
from typing import List, Dict, Union, Set

init(autoreset=True)

LOCK = threading.Lock()



# TODO
# --> Some checks are missing
#   -> f.e. Values which only consist of ???'s or "empty" values need to be removed
# --> It would be beneficial to use dictionaries instead of lists/tuples/sets in most cases :- rewrite
# --> Packageinserts need to be differentiated from Country-variations :- write function
class InformationExtractor:
    """
    A class for extracting information from HTML files using BeautifulSoup.
    """

    class MessageType(Enum):
        ERROR = 0
        WARNING = 1
        INFO = 2

    class TablePosition(Enum):
        MPG_NR = 0
        FIGURE_NAME = 1
        SERIES_NAME = 2
        YEAR = 3

    # TODO -> Method is execting get_series_info to often
    # Should only be called for each series and not each figure
    # Can be made more efficient by calling the get_figure_content only for each
    # series (function also needs to be rewritten then)
    @staticmethod
    def get_html_content(path: str) -> List[Dict[str, Union[str, bool, Set[bytes]]]]:
        """
        Retrieves the HTML content from a file and returns a tuple with the extracted information.

        Args:
            path (str): The path to the HTML file.

        Returns:
            tuple[str, bool, str, set[bytes]]: A list containing the extracted information.
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

        tr_elements: ResultSet[BeautifulSoup] = soup.find_all('tr')

        current_main_series: dict = { "seriesLetter" : None }
        current_series: dict = None
        elements: list = []
        last_series_name: str = ""
        for element in tr_elements:
            tds: ResultSet[BeautifulSoup] = element.find_all('td')
            series: str
            name: str 
            mpg_nr: str

            try:
                series = cleanup(tds[2].get_text(strip=True))
                name = cleanup(tds[1].get_text(strip=True))
                mpg_nr = cleanup(tds[0].get_text(strip=True))
            except IndexError:
                print("[-] Key was out of bound")
                continue
            
            if name == None or "?" in name or "?" in mpg_nr or name == "Figur":
                print("[-] Figure has no name: Nr: " + mpg_nr)
                continue

            series_letter: str
            match = re.match(r"\D*", mpg_nr)
            if match:
                series_letter = match.group()

            if current_main_series['seriesLetter'] == None:
                current_main_series['seriesLetter'] = series_letter
                current_main_series['subSeries'] = []

            element_data: dict = {
                "mpgNr" : mpg_nr,
                "name" : name,
                "year" : cleanup(tds[3].get_text(strip=True)),
                "packageInserts" : []
            }
              
            link: BeautifulSoup = element.find('a')
            absolut_path: str 
            if link:
                absolut_path = InformationExtractor.__join_paths(link.get('href'), os.path.dirname(path))
            else:
                print(element_data)

            element_data.update(InformationExtractor.get_figure_content(absolut_path, name))

            def move_mpgs(current_series: dict):
                pckgi: list = current_series["pckgi"]
                for insert in pckgi:
                    for figure in current_series["figures"]:
                        if insert["mpgNr"] == figure["mpgNr"]:
                            figure["packageInserts"].append(insert["picture"])
                del current_series["pckgi"]
            
            if series == '"' or series == last_series_name:
                current_series["figures"].append(element_data)
            else:
                if current_series:
                    move_mpgs(current_series)
                    current_main_series["subSeries"].append(current_series)
                    if current_main_series["seriesLetter"] != series_letter:
                        elements.append(current_main_series)    
                        current_main_series = { "seriesLetter" : series_letter, "subSeries" : []}

                current_series = { "name" : series, "figures" : [element_data] }
                current_series.update(InformationExtractor.get_series_info(absolut_path))
                last_series_name = series

        move_mpgs(current_series)
        current_main_series['subSeries'].append(current_series)
        elements.append(current_main_series)
        return elements

    @staticmethod
    def get_figure_content(href: str, figure_id: str) ->  Dict[str, Union[str, bool, Set[bytes]]]:
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

        figure_tr: ResultSet[BeautifulSoup] = soup.find_all('tr')

        values: tuple = ()
        for tr in figure_tr:
            found_element = tr.find('b', string=lambda text: text and figure_id in text.strip())
            if found_element:
                images: list = None
                images = [element.get('src') for element in tr.find_all('img') if element]

                if len(images) == 0:
                    InformationExtractor.__display_info(InformationExtractor.MessageType.WARNING, f"""No Image found for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")

                b_images: set[str] = set()
                for image in images:
                    absolut_path: str = InformationExtractor.__join_paths("../" + image, href)
                    b_images.add(absolut_path)
                del images

                kennung: str = cleanup(found_element.find_next('td').find_next('td').find_next('td').get_text(strip=True))
                aufkleber: bool = cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True)) != "keine Aufkleber"
                note: str = cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True))
                values: dict[str, Union[str, bool, set[bytes]]] = { "identifier" : kennung, "sticker" : aufkleber, "note" : note, "pictures" : b_images }
                break

        if not values:
            InformationExtractor.__display_info(InformationExtractor.MessageType.WARNING, f"""No values could be found! There could be a potential error in file: {Fore.BLUE}{href}{Style.RESET_ALL} -> In search for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")

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
            InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR, f"""File: {Fore.BLUE}{path}{Style.RESET_ALL} could not be found!""")


    @staticmethod
    def get_series_info(href: str) -> Dict[str, Union[str, List[Dict[str, Union[str, bool, Set[bytes]]]]]]:
        """
        Retrieves information about a series from an HTML file.

        Parameters:
            href (str): The path to the HTML file containing the series information.

        Returns:
            tuple[str, list[tuple[str, str, str, set[bytes]]]]: A tuple containing the "thank you" message and country variation information.

        """
        html: str
        with open(href) as file:
            html = file.read()
        soup = BeautifulSoup(html, 'html.parser')
        del html

        b_text: ResultSet[BeautifulSoup] = soup.find_all('b')

        cv_info: list[tuple[str, str, str, set[bytes]]] = None
        for text in b_text:
            if "beipackzettel" in text.get_text(strip=True).lower() or "bpz" in text.get_text(strip=True).lower():
                found = text.find_next('a')

                if found:
                    link = found.get('href')
                    absolut_path: str = InformationExtractor.__join_paths('../' + link, href)
                    cv_info = InformationExtractor.get_country_variation_info(absolut_path)


        pckgi_info: list = None
        if not cv_info:
            # InformationExtractor.__display_info(InformationExtractor.MessageType.WARNING, f"No country-variation information could be retrieved for {Fore.BLUE}{href}{Style.RESET_ALL}")
            pckgi_info = InformationExtractor.get_pi_backside(href)
            if not pckgi_info:
                InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR, f"None of the package-insert patterns matched for {Fore.BLUE}{href}{Style.RESET_ALL}")
            # InformationExtractor.__display_info(InformationExtractor.MessageType.INFO, f"Information for dev's: The function which handles direct package-inserts needs to be implemented and then called instead of this message")

        def get_thanks_msg() -> str:
            font_element = soup.find('div', align='center')
            names: str = font_element.get_text(strip=True)

            del font_element

            thanks_begin: int = names.find('Dank')
            thanks_end: int = names.find('!') # NOTE This could be a potential error source

            thankings: str = names[thanks_begin:thanks_end] + "!"
            thankings = cleanup(thankings)

            del thanks_begin, thanks_end, names
            
            if not thankings:
                InformationExtractor.__display_info(InformationExtractor.MessageType.WARNING, f"""No "thank you" message found in {Fore.BLUE}{href}{Style.RESET_ALL}""")
            return thankings

        data_dict: dict = { "thanks" : get_thanks_msg()}

        data_dict.update({"pckgi" : []})
        if cv_info:
            for cv in cv_info:
                for info in cv["pckgi"]:
                    data_dict["pckgi"].append(info)
                del cv["pckgi"]
                data_dict.update({"countryVariations" : cv_info})

        if pckgi_info:
            for data in pckgi_info:
                data_dict["pckgi"].append(data)
        
        font: BeautifulSoup = soup.find("font", { "size" : '2'})
        create_infos: list = font.get_text(strip=True).replace(";", "").split(" ")

        try:
            data_dict["year"] = create_infos[1]
            data_dict["country"] = create_infos[2]
        except IndexError:
            pass

        return data_dict


    @staticmethod
    def get_pi_backside(href: str):
        html: str = open(href).read()

        soup: BeautifulSoup = BeautifulSoup(html, 'html.parser')
        
        tds: ResultSet[BeautifulSoup] = soup.find_all("td")
        imgs: ResultSet[BeautifulSoup] = soup.find_all("img")
        
        img_srces: list[dict[str, bytes]] = []
        for img in imgs:
            img_srces.append(img.get("src"))

        resolved_images: list[dict[str, bytes]] = []
        current_figure: dict
        for td in tds:
            mpg_nr: str = None
            try: 
                mpg_nr = td.find("b").get_text(strip=True)
            except AttributeError as e:
                continue

            # TODO Can be made more efficient by returning a list of pictures per mpgNr
            for src in img_srces:
                if src.find(mpg_nr) == -1:
                    continue
                resolved_images.append({ "mpgNr" : mpg_nr, "picture" : InformationExtractor.__join_paths("../" + src, href)})
                #resolved_images.append({ mpg_nr : "Here should be an image" })
        return resolved_images


    @staticmethod
    def get_country_variation_info(href: str) -> List[Dict[str, Union[str, bool, Set[bytes], List[Dict[str, bytes]]]]]:
        """
        Extracts country variation information from an HTML file.

        Parameters:
            href (str): The path to the HTML file.

        Returns:
            list[tuple[str, str, str, set[bytes]]]: A list of tuples containing the extracted information.
                Each tuple represents a country variation and contains the following elements:
                - country (str): The country associated with the variation.
                - year (str): The year of the variation.
                - note (str): Additional notes or details about the variation.
                - images (set[bytes]): A set of images associated with the variation.

        """
        html: str = ""
        with open(href) as file:
            html = file.read()
        
        soup = BeautifulSoup(html, 'html.parser')
        tr_elements: ResultSet[BeautifulSoup] = soup.find_all('tr')
        del html, soup

        bpz_index: int = 1
        informations: list = []
        for tr in tr_elements:
            td: BeautifulSoup = tr.find('td')
            try:
                if int(td.get_text(strip=True)) == bpz_index:
                    bpz_index += 1
                    pictures: ResultSet[BeautifulSoup] = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_all('img')

                    images: set[bytes] = set()
                    for img in pictures:
                        source: str = img.get('src')
                        absolut_path: str = InformationExtractor.__join_paths("../" + source, href)
                        images.add(absolut_path)
                    del pictures

                    country, year = tr.find_next('tr').get_text(strip=True).split('-')
                    note: str = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').get_text(strip=True)
                    bpz_link: str = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_next('tr').find('a').get('href')
                    bpz_info = InformationExtractor.get_pi_backside(InformationExtractor.__join_paths("../" + bpz_link, href))

                    note = cleanup(note)
                    country = cleanup(country)
                    year = cleanup(year)

                    if country is None and year is None and note is None:
                        InformationExtractor.__display_info(InformationExtractor.MessageType.WARNING, f"""The PackageInsert at {Fore.YELLOW}{href}{Style.RESET_ALL} could not be correct! (No values found)""")
    	            
                    informations.append({ "country" : country, "year" : year, "note" : note, "images" : images, "pckgi" : bpz_info }) # NOTE -> Add the images variable as a return-type here
            except ValueError:
                pass
        return informations

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
                case InformationExtractor.MessageType.ERROR:
                    begin = f"""{Fore.RED}[-] ERROR!{Style.RESET_ALL}:"""
                case InformationExtractor.MessageType.WARNING:
                    begin = f"""{Fore.YELLOW}[~] WARNING!{Style.RESET_ALL}:"""
                case InformationExtractor.MessageType.INFO:
                    begin = f"""{Fore.BLUE}[*] INFO {Style.RESET_ALL}:"""

            print(begin + message)


def cleanup(val: str):
    """
    Removes unwanted characters from a string
    """
    return val.replace('\n', '').replace('\t', '')

