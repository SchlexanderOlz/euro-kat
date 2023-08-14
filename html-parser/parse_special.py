from os.path import join
from bs4 import BeautifulSoup
from bs4.element import ResultSet, Tag
from colorama import init, Fore, Style
from enum import Enum
import threading
import os
import re

class SpecialParser:

    @staticmethod
    def parse_deez(href: str):
        soup: BeautifulSoup
        with open(href) as file:
           soup = BeautifulSoup(file.read(), "html.parser") 

        result: dict = {}
        for ref in soup.find_all("a"):
            nuts: dict
            try:
                nuts = SpecialParser.nuts(os.path.normpath(os.path.join(href, "../" + ref.get("href"))))
            except Exception as e:
                continue
            name: str = ref.get_text(strip=True)
            result.update({ "name" : name, "data" : nuts })
            print(result)

    @staticmethod
    def join_tags(soup: BeautifulSoup, html_type: str):
       return "\n".join([p.get_text(strip=True).replace("\t", "") for p in soup.find_all(html_type)])

    @staticmethod 
    def nuts(href: str):
        soup: BeautifulSoup  
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")

        result: dict = {}
        for element in soup.find_all("td"):
            b: BeautifulSoup = element.find("b")
            if not b: continue
            result.update({ "numbered" : bool(re.search(r'\d', href))})
            match b.get_text(strip=True).strip():
                case "Allgemeines:":
                    joined_ps: str = SpecialParser.join_tags(soup, "p")
                    result.update({ "general" : joined_ps })
                    continue
                case "Adresskopf:":
                    img: BeautifulSoup = b.find_next("img")
                    if not img:
                        continue
                    img_src: str = img.get("src")

                    result.update({ "header" : img_src }) # TODO: Open this instead
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
                    result.update({ "variations" : SpecialParser.join_tags(b, "p")})
                    continue
                case x:
                    print("Failed to process " + x)

        return result

if __name__ == "__main__":
    SpecialParser().parse_deez("tmp-files/warnhinweise.html")
