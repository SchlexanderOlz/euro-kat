from bs4 import BeautifulSoup

class HTMLContentExtractor:
    
    def get_html_content(html: str, html_struct: str, clazz: str = None) -> list[str]:
        soup = BeautifulSoup(html, 'html.parser')
        # td_elements = soup.find_all('td', class_='a')
        td_elements = soup.find_all(html_struct, class_=clazz)
        text: list[str] = [td.get_text(strip=True, separator=' ') for td in td_elements]
        return [value.replace('\n', '').replace('\t', '').replace('"', '???') for value in text]


    def structure_content(content: list[str], break_at: str, group_range: int = 1 , ignore: set[str] = None) -> list[list[str]]:
        result = []
        for i in range(group_range - 1, len(content), group_range):
            tmp = content[i - group_range + 1:i]
            if break_at in tmp:
                break
            result.append(tmp)
        return result