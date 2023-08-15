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
    def parse_deez(href: str):
        soup: BeautifulSoup
        with open(href) as file:
           soup = BeautifulSoup(file.read(), "html.parser") 

        result: dict = {}
        for ref in soup.find_all("a"):
            nuts: dict
            try:
                nuts = WarningParser.nuts(os.path.normpath(os.path.join(href, "../" + ref.get("href"))))
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
                    joined_ps: str = WarningParser.join_tags(soup, "p")
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
                    result.update({ "variations" : WarningParser.join_tags(b, "p")})
                    continue
                case x:
                    print("Failed to process " + x)

        return result

class ExtraParser:

    @staticmethod
    def sugg_on(href: str):
        soup: BeautifulSoup
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")
        result: dict = {}
        for a in soup.find_all("a"):
            try:
                result.update({ "data" : ExtraParser.deez(os.path.normpath(os.path.join(href, "../" + a.get("href")))) })
            except Exception as e:
                pass
        print(result)


    @staticmethod
    def deez(href: str):
        soup: BeautifulSoup
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")

        result: dict = {}
        for td in soup.find_all("td"):
            b: BeautifulSoup = td.find("b") 
            if not b: continue
            match b.get_text(strip=True).strip():
                case "Warntext:":
                    result.update({ "text" : td.find_next("td").get_text(strip=True).replace("\t", "") })
                    continue
                case "Kennzeichnung:":
                    result.update({ "id" : td.find_next("td").get_text(strip=True) }) 
                    continue
                case "Adresskopf:":
                    result.update({ "address" : td.find_next("td").get_text(strip=True).replace("\t", "")  })
                    continue
                case "Format:":
                    result.update({ "format" : td.find_next("td").get_text(strip=True) })
                    continue
                case "Jahrgang:":
                    result.update({ "year" : int(td.find_next("td").get_text(strip=True)) })
                    continue
                case "Hinweis:":
                    result.update({ "note" : td.find_next("td").get_text(strip=True).replace("\t", "")  })
                    continue
                case x:
                    if "serie" in x.lower(): 
                        result.update({ "series" : td.find_next("td").get_text(strip=True) })
                        continue
                    if "dank" in x.lower():
                        result.update({ "thanks" : td.find_next("td").get_text(strip=True).replace("\t", "")  })
                        continue
                    if "typ" in x.lower():
                        text: str = td.find_next("td").get_text(strip=True).replace("\t", "")
                        match result.get("types"):
                            case None:
                                result.update({ "types" : [text] })
                                continue
                            case y:
                                y.append(text)
                                continue
                    print("failed to parse" + x)
        return result
        
if __name__ == "__main__":
    WarningParser.parse_deez("tmp-files/warnhinweise.html")
    ExtraParser.sugg_on("tmp-files/zusatz.html")
