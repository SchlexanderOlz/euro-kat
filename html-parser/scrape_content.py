from html_parser import HTMLContentExtractor


class Scraper:
    
    def get_akt_content() -> list[list[str]]:
        content: str
        with open("aktuell/akt2022.htm") as html:
            content = HTMLContentExtractor.get_html_content(html, 'td', 'a')
        return HTMLContentExtractor.structure_content(content, "Sonstiges aus der Saison 2022-2023 Deutschland", 4)

    # def get_content_from_website() -> list[list[str]]:
        

if __name__ == "__main__":
    print(Scraper.get_akt_content())