from bs4 import BeautifulSoup
import os

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
    def get_html_content(path: str, html_struct: str, clazz: str = None) -> list[str, list[str, bool]]:
        html: str = ""
        with open(path) as file:
            html = file.read()

        replaced_html = InformationExtractor.replace_nbsp_elements(html)
        soup = BeautifulSoup(replaced_html, 'html.parser')
        td_elements = soup.find_all(html_struct, class_=clazz)
        
        tr_elements = soup.find_all('tr')
        
        last_serial: str = "Not implemented!"
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
                if i == 1:
                    figure_name = content

                tmp.append(content)
            link = element.find('a')
            
            # TODO stopped here -> Implement the get_figure_content function fully
            if link:
                tmp.append(InformationExtractor.get_figure_content(InformationExtractor.join_paths(link.get('href'), os.path.dirname(path)), figure_name))
            elements.append(tmp)
        print(elements)
        
        return elements


    @staticmethod
    def structure_content(content: list[str, list[str]], break_at: str, group_range: int = 1, ignore: set[str] = None, link_pos: int = 1) -> list[list[str, list[str, bool]]]:
        
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
    def get_figure_content(href: str, figure_id: str) -> list[str, bool]:
        html: str = ""
        with open(href) as file:
            html = file.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # TODO stopped here -> Try to get the tr element which has the figure_id in it and then get the Kennung, Aufkleber, etc. from the following tr elements (.find_next)
        figure_tr = soup.find_all('tr', string=lambda text: text.strip() == figure_id)
        
        
        # TODO Make function instead which checks if the value is valid
        kennung_structs = soup.find_all('td', string=lambda text: text and text.strip() == 'Kennung')
        aufkleber_structs = soup.find_all('td', string=lambda text: text and text.strip() == 'Aufkleber')
        
        values = []
        for i in range(len(kennung_structs)):
            kennung = InformationExtractor.cleanup(kennung_structs[i].find_next('td').get_text(strip=True))
            aufkleber = InformationExtractor.cleanup(aufkleber_structs[i].find_next('td').get_text(strip=True)) != 'keine Aufkleber'
            
            values.append([kennung, aufkleber])
                    
        return values
    
    
    @staticmethod
    def cleanup(val: str):
        return val.replace('\n', '').replace('\t', '')
