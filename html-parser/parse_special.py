from os.path import join
from bs4 import BeautifulSoup
from bs4.element import ResultSet, Tag
from colorama import init, Fore, Style
from enum import Enum
import threading
import os
import re


class WarningParser:

    @staticmethod
    def parse_deez(href: str) -> list:
        soup: BeautifulSoup
        with open(href) as file:
           soup = BeautifulSoup(file.read(), "html.parser") 

        result: list = []
        for ref in soup.find_all("a"):
            nuts: dict
            try:
                nuts = WarningParser.nuts(os.path.normpath(os.path.join(href, "../" + ref.get("href"))))
            except Exception as e:
                continue
            name: str = ref.get_text(strip=True)
            nuts.update({ "name" : name })
            result.append(nuts)
        return result

    @staticmethod
    def join_tags(soup: BeautifulSoup, html_type: str) -> str:
       return "\n".join([p.get_text(strip=True).replace("\t", "").replace("\n", "") for p in soup.find_all(html_type)])

    @staticmethod 
    def nuts(href: str) -> dict:
        soup: BeautifulSoup  
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")

        result: dict = {}
        result.update({ "numbered" : bool(re.search(r'\d', href))})
        for element in soup.find_all("td"):
            b: BeautifulSoup = element.find("b")
            if not b: continue
            match b.get_text(strip=True).strip():
                case "Allgemeines:":
                    joined_ps: str = WarningParser.join_tags(soup, "p")
                    result.update({ "general" : joined_ps })
                    continue
                case "Adresskopf:":
                    img: BeautifulSoup = b.find_next("img")
                    if not img:
                        continue
                    img_src: str = img.get("src")
                    absolute_path: str = os.path.normpath(os.path.join(href, "../" + img_src))

                    result.update({ "header" : absolute_path })
                    continue
                case "Länderkennzeichen A-Seite:":
                    result.update({ "countryA" : element.get_text(strip=True) })
                    continue
                case "Länderkennzeichen B-Seite:":
                    result.update({ "countryB" : element.get_text(strip=True) })
                    continue
                case "Format:":
                    result.update({ "format" : element.get_text(strip=True)})
                    continue
                case "Bekannte Varianten:":
                    result.update({ "variations" : WarningParser.join_tags(b, "p")})
                    continue
                case x:
                    print("Failed to process " + x)
        return result

def next_cleanup(soup: BeautifulSoup) -> str:
    return cleanup(soup.find_next("td").get_text(strip=True))

def cleanup(cleaned: str) -> str:
    return cleaned.replace("\t", "").replace("\n", "")
    
class ExtraParser:

    @staticmethod
    def sugg_on(href: str) -> list:
        soup: BeautifulSoup
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")
        result: list = []
        for a in soup.find_all("a"):
            try:
                result.append(ExtraParser.deez(os.path.normpath(os.path.join(href, "../" + a.get("href")))))
            except Exception as e:
                pass
        return result


    @staticmethod
    def deez(href: str) -> dict:
        soup: BeautifulSoup
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")

        result: dict = {}
        for td in soup.find_all("td"):
            b: BeautifulSoup = td.find("b") 
            if not b: continue
            pot_next: str = next_cleanup(td)
            match b.get_text(strip=True).strip():
                case "Warntext:":
                    result.update({ "text" : pot_next })
                    continue
                case "Kennzeichnung:":
                    result.update({ "id" : pot_next }) 
                    continue
                case "Adresskopf:":
                    result.update({ "address" : pot_next })
                    continue
                case "Format:":
                    result.update({ "format" : pot_next })
                    continue
                case "Jahrgang:":
                    result.update({ "year" : int(pot_next) })
                    continue
                case "Hinweis:":
                    result.update({ "note" : pot_next })
                    continue
                case x:
                    if "serie" in x.lower(): 
                        result.update({ "series" : pot_next })
                        continue
                    if "dank" in x.lower():
                        result.update({ "thanks" : pot_next })
                        continue
                    if "typ" in x.lower():
                        text: str = pot_next
                        match result.get("types"):
                            case None:
                                result.update({ "types" : [text] })
                                continue
                            case y:
                                y.append(text)
                                continue
                    print("failed to parse" + x)
        return result
