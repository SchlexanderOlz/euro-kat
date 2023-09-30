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


QUIET: bool = True

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
                continue

            questionable: bool = False
            if "fraglich" in series.lower() or "fraglich" in name.lower():
                questionable = True
            
            fake: bool = False
            if "fälschung" in series.lower() or "fälschung" in name.lower():
                fake = True

            series_letter: str
            match = re.match(r"\D*", mpg_nr.replace("-", ""))
            if match:
                series_letter = match.group().upper()

            if current_main_series['seriesLetter'] == None:
                current_main_series['seriesLetter'] = series_letter
                current_main_series['subSeries'] = []

            element_data: dict = {
                "mpgNr" : mpg_nr,
                "name" : name,
                "year" : cleanup(tds[3].get_text(strip=True)),
                "fake" : fake,
                "questionable" : questionable
            }
              
            link: BeautifulSoup = element.find('a')
            absolut_path: str 
            if link:
                absolut_path = InformationExtractor.__join_paths(link.get('href'), os.path.dirname(path))
            else:
                print(element_data)

            element_data.update(InformationExtractor.get_figure_content(absolut_path, name))

 
            if series == '"' or series == last_series_name:
                current_series["figures"].append(element_data)
            else:
                if current_series:
                    current_main_series["subSeries"].append(current_series)
                    if current_main_series["seriesLetter"] != series_letter:
                        elements.append(current_main_series)    
                        current_main_series = { "seriesLetter" : series_letter, "subSeries" : []}

                current_series = { "name" : series, "figures" : [element_data] }
                current_series.update(InformationExtractor.get_series_info(absolut_path))
                last_series_name = series

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
        try:
            with open(href) as file:
                html = file.read()
        except FileNotFoundError as e:
            InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR, "File not found: " + href)
        soup = BeautifulSoup(html, 'html.parser')
        del html

        figure_tr: ResultSet[BeautifulSoup] = soup.find_all('tr')

        values: dict = {}
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

                aufkleber: bool = cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True)) != "keine Aufkleber"
                identifier: bool = cleanup(found_element.find_next('td').find_next('td').get_text(strip=True))
                naming_field: BeautifulSoup = found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td')
                note: str = "" 
                try:
                    note = cleanup(naming_field.get_text(strip=True))
                except AttributeError:
                    pass
                values = { "identifier" : identifier, "sticker" : aufkleber, "note" : note, "pictures" : b_images }
                break

        if values == {}:
            InformationExtractor.__display_info(InformationExtractor.MessageType.WARNING, f"""No values could be found! There could be a potential error in file: {Fore.BLUE}{href}{Style.RESET_ALL} -> In search for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")

        return values

    @staticmethod
    def parse_variation(href: str) -> List:
        html: str = ""
        try:
            with open(href) as file:
                html = file.read()
        except FileNotFoundError as e:
            InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR, "Couldnt open file: " + href)
            return
        soup = BeautifulSoup(html, 'html.parser')
        del html
        result: list = []
        for td in soup.find_all("td"):
            b: ResultSet[BeautifulSoup] = td.find_all("b")
            if not b: continue
            mpgNr: str = b[0].get_text(strip=True)
            if not re.search(r'\d', mpgNr): continue

            images: list = []
            oldTd: BeautifulSoup = td
            while True:
                next: BeautifulSoup = oldTd.find_next("td")
                oldTd = next
                if not next or next.get("bgcolor"): break
                imgs: ResultSet[BeautifulSoup] = next.find_all("img")
                if not imgs: continue
                images.extend([os.path.normpath(os.path.join(href, "../" + img.get("src"))) for img in imgs])
            result.append({ "mpgNr" : mpgNr, "images": images})
        return result

    @staticmethod
    def parse_packaging(href: str) -> List:
        html: str = ""
        with open(href) as file:
            html = file.read()
        soup = BeautifulSoup(html, 'html.parser')
        del html

        result: list = []
        for td in soup.find_all("td"):
            b: BeautifulSoup = td.find("b")
            if not b: continue
            name: str = b.get_text(strip=True)
            thanks: str = td.get_text(strip=True).replace(name, "")

            lastTd: BeautifulSoup = td
            images: list = []
            while True:
                next: BeautifulSoup = lastTd.find_next("td")
                if not next: break
                imgs: ResultSet = next.find_all("img")
                if not imgs or len(imgs) == 0: break
                images.extend([os.path.normpath(os.path.join(href, "../" + image.get("src"))) for image in imgs])
                if len(images) == 0: break
                lastTd = next
            result.append({ "name" : name, "thanks" : thanks, "images": images})
        return result

    @staticmethod
    def get_series_info(href: str) -> Dict:
        """
        Retrieves information about a series from an HTML file.

        Parameters:
            href (str): The path to the HTML file containing the series information.

        Returns:
            tuple[str, list[tuple[str, str, str, set[bytes]]]]: A tuple containing the "thank you" message and country variation information.

        """

        def get_thanks_msg(soup: BeautifulSoup) -> str:
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


        html: str
        with open(href) as file:
            html = file.read()
        soup = BeautifulSoup(html, 'html.parser')
        del html

        b_text: ResultSet[BeautifulSoup] = soup.find_all('b')

        cv_info: list = None
        variation_info: list = None
        figure_variation_info: list = None
        for text in b_text:
            if "beipack" in text.get_text(strip=True).lower().strip() or "bpz" in text.get_text(strip=True).lower().strip():
                found = text.find_next('a')
                if found:
                    link = found.get('href')
                    absolut_path: str = InformationExtractor.__join_paths('../' + link, href)
                    cv_info = InformationExtractor.get_country_variation_info(absolut_path)
            elif "verpackungen" in text.get_text(strip=True).lower().strip():
                found = text.find_next('a')

                if found:
                    link = found.get('href')
                    absolut_path: str = InformationExtractor.__join_paths('../' + link, href)
                    variation_info = InformationExtractor.parse_packaging(absolut_path)
            elif "variation" in text.get_text(strip=True).lower().strip():
                found = text.find_next('a')
                if found:
                    link = found.get('href')
                    absolut_path: str = InformationExtractor.__join_paths('../' + link, href)
                    figure_variation_info = InformationExtractor.parse_variation(absolut_path)
                

        sub_series: dict = {"thanks" : get_thanks_msg(soup), "packaging": variation_info, "figureVariations": figure_variation_info}
        pckgi_info: list = None

        if cv_info:
            sub_series.update({
                "variations" : cv_info
            })
            return sub_series  

        trs: ResultSet[BeautifulSoup] = soup.find_all("tr")
        imgs: ResultSet[BeautifulSoup] = trs[0].find_all("img")
        image_srces: list = []
        for img in imgs:
            image_srces.append(InformationExtractor.__join_paths("../" + img.get("src"), href))

        font: BeautifulSoup = soup.find("font", { "size" : '2'})
        span: BeautifulSoup = soup.find("span")
        pattern = r'\b\d+-\d+\b'
        year: str = "???"
        create_infos: list = []
        if font:
            year = re.findall(pattern, font.get_text(strip=True))
            if len(year) > 0 and span:
                year = year[0]
                create_infos = span.get_text(strip=True).replace(";", "").replace("Joy", "").split(year)

        country: str = None
        try:
            country = create_infos[1]
        except IndexError:
            print(create_infos)
            InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR,
                                            "Couldnt get year or country for: " + href)


        pckgi_info = InformationExtractor.get_pi_backside(href)
        if not pckgi_info:
            InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR, f"None of the package-insert patterns matched for {Fore.BLUE}{href}{Style.RESET_ALL}")

        sub_series.update({
            "variations" : [
                {
                    "year" : year,
                    "country" : country,                           
                    "pckgi" : pckgi_info,
                    "images" : image_srces,
                    "note" : ""
                }
            ],
        })
        return sub_series


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
        for td in tds:
            mpg_nr: str = None
            try: 
                mpg_nr = td.find("b").get_text(strip=True)
            except AttributeError as e:
                continue

            myImages: list = []
            for src in img_srces:
                if src.find(mpg_nr) == -1:
                    continue
                myImages.append(InformationExtractor.__join_paths("../" + src, href))
            if len(myImages) > 0:
                resolved_images.append({ "mpgNr" : mpg_nr, "picture" : myImages})
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

        try:
            with open(href) as file:
                html = file.read()
        except FileNotFoundError as e:
            InformationExtractor.__display_info(InformationExtractor.MessageType.ERROR, "File could not be found: " + href)
        
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

                    images: [dict] = []
                    for img in pictures:
                        source: str = img.get('src')
                        absolut_path: str = InformationExtractor.__join_paths("../" + source, href)
                        images.append(absolut_path)
                    del pictures

                    country, year = tr.find_next('tr').get_text(strip=True).split('-')
                    country = country.strip()
                    year = year.strip()
                    note: str = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').get_text(strip=True)
                    bpz_container: BeautifulSoup = tr.find_next('tr').find_next('tr').find_next('tr').find_next('tr').find_next('tr')
                    bpz_info: dict = []
                    if bpz_container:
                        a = bpz_container.find('a')
                        if a:
                            bpz_info = InformationExtractor.get_pi_backside(InformationExtractor.__join_paths("../" + a.get("href"), href))

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
    def __display_info(message_type: MessageType, message: str):
        """
        Displays a formatted message of a specific message type.

        Args:
            message_type (MessageType): The type of the message (ERROR, WARNING, INFO).
            message (str): The message content.
        """
        if QUIET: return
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

