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
                print(e)
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

        result: dict = { "varTypes" : []}
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
                    if not img: continue
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
                    result.update({ "format" : element.get_text(strip=True).replace("Format:", "")})
                    continue
                case x:
                    if "bekannte" in x.lower():
                        result.update({ "variations" : WarningParser.join_tags(element, "p")})
                        continue
                    if "typ" in x.lower():
                        oldTd: BeautifulSoup = element
                        types: list = []
                        while True:
                            nextTd: BeautifulSoup = oldTd.find_next("td")
                            oldTd = nextTd
                            if oldTd == None: break
                            if nextTd.find("b") != None: break
                            img: str = nextTd.find("img")
                            if not img: continue
                            src: str = img.get("src")
                            absPath: str = os.path.normpath(os.path.join(href, "../" + src))
                            types.append(absPath)
                            print(absPath)
                        result["varTypes"].append({ "typeName" : x, "images" : types})
                        continue

                    print("Failed to process " + x)

        if len(result["varTypes"]) == 0:
            picContainers: ResultSet[BeautifulSoup] = soup.find_all("td", { "class" : "pic"} )
            del result["varTypes"]
            result.update({ "imgs" : set()})
            for container in picContainers:
                pic: BeautifulSoup = container.find_next("img")
                if not pic: continue
                picSrc: str = container.find_next("img").get("src")
                absPath: str = os.path.normpath(os.path.join(href, "../" + picSrc))
                result["imgs"].add(absPath)
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
                data: dict = ExtraParser.deez(os.path.normpath(os.path.join(href, "../" + a.get("href"))))
                result.append(data)
            except Exception as e:
                print(e)
                pass
        return result


    @staticmethod
    def deez(href: str) -> dict:
        soup: BeautifulSoup
        with open(href) as file:
            soup = BeautifulSoup(file.read(), "html.parser")

        result: dict = { "numbered" : bool(re.search(r'\d', href)), "types" : []}


        for td in soup.find_all("td"):
            b: BeautifulSoup = td.find("b") 
            if not b: continue
            pot_next: str = next_cleanup(td)
            match b.get_text(strip=True).strip():
                case "Nr.":
                    result.update({"name" : pot_next})
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
                    result.update({ "year" : pot_next })
                    continue
                case "Hinweis:":
                    result.update({ "note" : pot_next })
                    continue
                case "Ländertexte":
                    result.update({ "countries" : pot_next})
                    continue
                case x:
                    if "zusatz" in x.lower() or "typ" in x.lower():
                        types: list = []
                        oldTd: BeautifulSoup = b
                        while True:
                            nextTd: BeautifulSoup = oldTd.find_next("td")
                            oldTd = nextTd
                            if not oldTd: break
                            if nextTd.find("b") != None: break
                            img: BeautifulSoup = nextTd.find("img")
                            if not img: continue
                            src: str = img.get("src")
                            absPath: str = os.path.normpath(os.path.join(href, "../" + src))
                            types.append(absPath)
                        result["types"].append(types)
                        continue
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
                    print("[-] Failed to parse: " + x)
        if len(result["types"]) == 0:
            result["types"] = [os.path.normpath(os.path.join(href, "../" + element.get("src"))) for element in soup.find_all("img")]

        return result
