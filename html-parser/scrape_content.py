from html_parser import InformationExtractor
from typing import Callable
import threading
import sys
import json
import base64

SRCES: list[str] = ["I:/Code/(Deprecated)EuroKatFiles/JGListen/WEN.htm"]


class Scraper:
    @staticmethod
    def get_html_content(buff: list) -> list[list[str]]:
        threads: list[threading.Thread] = []

        def execute_and_print(callback: Callable, param: str) -> None:
            result = callback(param)
            """for el in result:
                print(el)
                print("\n\n")"""
            buff.extend(result)

        for src in SRCES:
            thread = threading.Thread(
                target=execute_and_print,
                args=(InformationExtractor.get_html_content, src),
            )
            threads.append(thread)

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

    @staticmethod
    def get_series_content(buff: list) -> list[list[str]]:
        threads: list[threading.Thread] = []

        def execute_and_print(callback: Callable, param: str) -> None:
            result = callback(param)
            """for el in result:
                print(el)
                print("\n\n")"""
            buff.extend(result)

        for src in SRCES:
            thread = threading.Thread(
                target=execute_and_print,
                args=(InformationExtractor.get_series_content, src),
            )
            threads.append(thread)

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

    @staticmethod
    def save_to_json(data: any):
        filename = "data.json"
        with open(filename, "w") as file:
            json.dump(data, file, cls=SetEncoder)

    @staticmethod
    def save_series_to_json(data: any):
        filename = "series.json"
        with open(filename, "w") as file:
            json.dump(data, file, cls=SetEncoder)

    @staticmethod
    def join_files(data_file: list, series_file: list):
        for series in series_file:
            try:
                for variation_infos in series["series_info"]["variation_infos"]:
                    if "pckgi" in variation_infos:
                        for keys_list in variation_infos["pckgi"]:
                            for key in keys_list.keys():
                                pic = keys_list[key]
                                for data in data_file:
                                    if data["mpg_nr"] == key:
                                        value = data 
                                        value.update({"picture": pic})
                                        keys_list[key] = value

            except KeyError:
                try:
                    for pckgi_list in series["series_info"]["pckgi"]:
                        for key in pckgi_list.keys():
                            pic = pckgi_list[key]
                            for data in data_file:
                                if data["mpg_nr"] == key:
                                    value = data
                                    value.update({"picture": pic})
                                    pckgi_list[key] = value
                except Exception:
                    #print(series)
                    pass # series for which no figure has a valid link get skipped
        return series_file
                            
                        




class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        if isinstance(obj, bytes):
            return base64.b64encode(obj).decode('utf-8')
        return super().default(obj)


if __name__ == "__main__":
    try:
        html_buff: list = []
        html_content_thread = threading.Thread(
            target=Scraper.get_html_content, args=(html_buff,)
        )
        html_content_thread.start()

        series_buff: list = []
        series_content_thread = threading.Thread(
            target=Scraper.get_series_content, args=(series_buff,)
        )
        series_content_thread.start()

        html_content_thread.join()
        series_content_thread.join()

        

        series_data = Scraper.join_files(html_buff[1:], series_buff[1:])
        Scraper.save_to_json(html_buff)
        Scraper.save_series_to_json(series_data)
    except KeyboardInterrupt:
        print("Ctrl+C received. Exiting...")
        sys.exit(0)
