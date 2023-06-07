from bs4 import BeautifulSoup
import urllib.parse
from colorama import init, Fore, Style

from enum import Enum

import os


init(autoreset=True)


class MessageType(Enum):
    ERROR = 0,
    WARNING = 1,
    INFO = 2

class InformationExtractor:

    @staticmethod
    def replace_nbsp_elements(html):
        soup = BeautifulSoup(html, 'html.parser')
        
        # This get's all elements in the html which are not a non-breaking-space (&nbsp)
        # They then get replaced by ??? just for simnplified output
        for element in soup.find_all(text=lambda t: t == '\xa0'):
            element.replace_with('???')
        return str(soup)


    # TODO Rewrite cleanup part so always the last serial-element is referenced (currently printing "Not implemented!")
    @staticmethod
    def get_html_content(path: str, html_struct: str, clazz: str = None) -> tuple[str, bool, str, set[bytes]]:
        html: str = ""
        with open(path) as file:
            html = file.read()

        replaced_html = InformationExtractor.replace_nbsp_elements(html)
        soup = BeautifulSoup(replaced_html, 'html.parser')
        td_elements = soup.find_all(html_struct, class_=clazz)
        
        tr_elements = soup.find_all('tr')
        
        last_serial: str = "Error Value!!!!"
        elements = []
        for element in tr_elements:
            tmp = []
            figure_name: str
            for i, td in enumerate(element.find_all('td')):
                content = InformationExtractor.cleanup(td.get_text(strip=True))
                if i == 2:
                    if content == '"':
                        content = last_serial
                    else:
                        last_serial = content
                    continue
                if i == 0:
                    figure_name = content.strip()

                tmp.append(content)
            link = element.find('a')
            

            # TODO stopped here -> Implement the get_figure_content function fully
            if link:
                tmp.append(InformationExtractor.get_figure_content(InformationExtractor.join_paths(link.get('href'), os.path.dirname(path)), figure_name))
            elements.append(tmp)
        print(elements)
        
        return elements


    @staticmethod
    def join_paths(relative_path: str, other_path: str) -> str:
        joined_path = os.path.normpath(os.path.join(other_path, relative_path))
        return joined_path


    @staticmethod
    def get_figure_content(href: str, figure_id: str) -> tuple[str, bool, str, set[bytes]]:
        html: str = ""
        with open(href) as file:
            html = file.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # TODO stopped here -> Try to get the tr element which has the figure_id in it and then get the Kennung, Aufkleber, etc. from the following tr elements (.find_next)
        figure_tr = soup.find_all('tr')
        
        
        values: tuple = ()
        for tr in figure_tr:
            found_element = tr.find('b', string=lambda text: text and text.strip().lower() == figure_id.lower())
            if found_element:
                images = None
                images = [element.get('src') for element in tr.find_all('img') if element]
                
                if len(images) == 0:
                    InformationExtractor.__display_info(MessageType.WARNING, f"""No Image found for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")

                b_images: set[bytes] = set()
                for image in images:
                    b_image = InformationExtractor.get_image(href, "../" + image)
                    b_images.add(b_image)


                kennung = InformationExtractor.cleanup(found_element.find_next('td').find_next('td').find_next('td').get_text(strip=True))
                aufkleber = InformationExtractor.cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True)) != "keine Aufkleber"
                note = InformationExtractor.cleanup(found_element.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').get_text(strip=True))
                values = (kennung, aufkleber, note) # TODO b_images needs to be added as the last element. For debugging purposes (and readability of ouput) it was temporarely removed
                break
        
        if not values:
            InformationExtractor.__display_info(MessageType.WARNING, f"""No values could be found! There could be a potential error in file: {Fore.BLUE}{href}{Style.RESET_ALL} -> In search for {Fore.YELLOW}{figure_id}{Style.RESET_ALL}""")
        return values
    
    
    @staticmethod
    def cleanup(val: str):
        return val.replace('\n', '').replace('\t', '')
    
    
    @staticmethod
    def get_image(wd_path: str, rel_path: str) -> bytes:
        path = urllib.parse.unquote(InformationExtractor.join_paths(rel_path, wd_path))
        with open(path, 'rb') as file:
            return file.read()
    
    
    @staticmethod
    def __display_info(message_type: MessageType, message: str):
        
        begin: str
        match message_type:
            case MessageType.ERROR:
                begin = f"""{Fore.RED}[-] ERROR!{Style.RESET_ALL}:"""
            case MessageType.WARNING:
                begin = f"""{Fore.YELLOW}[~] WARNING!{Style.RESET_ALL}:"""
            case MessageType.INFO:
                begin = f"""{Fore.BLUE}[*] INFO {Style.RESET_ALL}:"""
        
        print(begin + message)
