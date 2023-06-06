from html_parser import InformationExtractor

SRCFILE: str = "I:/Code/(Deprecated)EuroKatFiles/JGListen/WSE.htm"

class Scraper:
    
    def get_html_content() -> list[list[str]]:
        content: str
        with open(SRCFILE) as file:
            html = file.read()
            content = InformationExtractor.get_html_content(SRCFILE, 'td', 'a')
        return InformationExtractor.structure_content(content, "Sonstiges aus der Saison 2022-2023 Deutschland", 4)


if __name__ == "__main__":
    print(Scraper.get_html_content())
    #Scraper.get_html_content()