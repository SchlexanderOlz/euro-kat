from html_parser import InformationExtractor
from typing import Callable
import threading
import sys
import json

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
        # EXAMPLE CODE
        # Code should not be used like this in production. This is just a temporary change with bad performance.

        # What is missing (TODO):
        # The data is not beeing saved to another variable currently.
        # Not sure if the key-errors will actually catch all the right things -> Could be insecure

        # Maybe look for different/original sollution where the series was directly merged with the rest of the data -> This current function will be inefficient no matter how optimized
        for series in series_file:
            try:
                for variation_info in series["variation_infos"]:
                    for pckgi in variation_info["pckgi"]:
                        for key in pckgi.keys():
                            pic = pckgi[key]
                            for data in data_file:
                                if data["mpg_nr"] == key:
                                    pckgi = data # Put the newly formed data into a variable
                                    pckgi.update({"picture": pic})
            except KeyError:
                try:
                    for pckgi in series["pckgi"]:
                        for key in pckgi.keys():
                            pic = pckgi[key]
                            for data in data_file:
                                if data["mpg_nr"] == key:
                                    pckgi = data
                                    pckgi.update({"picture": pic})
                except Exception:
                    pass


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)  # Convert set to list
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

        Scraper.join_files(html_buff, series_buff)
        Scraper.save_to_json(html_buff)
    except KeyboardInterrupt:
        print("Ctrl+C received. Exiting...")
        sys.exit(0)
