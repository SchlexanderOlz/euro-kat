from html_parser import InformationExtractor

SRCFILE: str = "I:/Code/(Deprecated)EuroKatFiles/JGListen/WSE.htm"

class Scraper:
    
    def get_html_content() -> list[list[str]]:
        return InformationExtractor.get_html_content(SRCFILE)


if __name__ == "__main__":
    print(Scraper.get_html_content())
    #Scraper.get_html_content()