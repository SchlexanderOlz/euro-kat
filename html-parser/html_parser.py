from bs4 import BeautifulSoup
import os

class HTMLContentExtractor:
    @staticmethod
    def replace_nbsp_elements(html):
        soup = BeautifulSoup(html, 'html.parser')
        for element in soup.find_all(text=lambda t: t == '\xa0'):
            element.replace_with('???')
        return str(soup)

    @staticmethod
    def get_html_content(path: str, html_struct: str, clazz: str = None) -> list[str, list[str]]:
        with open(path) as file:
            html = file.read()

            replaced_html = HTMLContentExtractor.replace_nbsp_elements(html)
            soup = BeautifulSoup(replaced_html, 'html.parser')
            td_elements = soup.find_all(html_struct, class_=clazz)
            content = []
            for td in td_elements:
                text = td.get_text(strip=True, separator=' ')
                link = td.find('a')
                content.append(text)  # Content is appended to position 0

                if link:
                    href = link.get('href')
                    joined_href = HTMLContentExtractor.join_paths(href, os.path.dirname(path))
                    content.append(HTMLContentExtractor.get_figure_content(joined_href))  # Append link content instead of link directly

        return [value.replace('\n', '').replace('\t', '').replace('"', '???') if isinstance(value, str) else value for value in content]


    @staticmethod
    def structure_content(content: list[str, list[str]], break_at: str, group_range: int = 1, ignore: set[str] = None, link_pos: int = 1) -> list[list[str, list[str]]]:
        
        group_range += 1

        result = []
        group = []
        for i in range(len(content)):
            if break_at in content[i]:
                break
            
            if len(group) == link_pos:
                if not isinstance(content[i], list):
                    group = []
            
            group.append(content[i])

            if len(group) == group_range:
                result.append(group)
                group = []
        if group:
            result.append(group)
        return result


    @staticmethod
    def join_paths(relative_path: str, other_path: str) -> str:
        joined_path = os.path.normpath(os.path.join(other_path, relative_path))
        return joined_path


    @staticmethod
    def get_figure_content(href: str) -> list[str]:
        print(href)
        return ["Figure Content"]
