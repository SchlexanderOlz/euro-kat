from bs4 import BeautifulSoup

with open("aktuell/akt2022.htm") as html:
    soup = BeautifulSoup(html, 'html.parser')

    # Find all <td> elements with class 'a'
    td_elements = soup.find_all('td', class_='a')

    # Extract the text from the <td> elements and remove leading/trailing spaces
    text:list[str] = [td.get_text(strip=True, separator=' ') for td in td_elements]

    text = [value.replace('\n', '').replace('\t', '') for value in text if value.strip()]

    result = []
    for i in range(3, len(text), 4):
        tmp = [text[i-3], text[i-2], text[i-1], text[i]]
        if "Sonstiges aus der Saison 2022-2023 Deutschland" in tmp: break
        result.append(tmp)

    print(result)

