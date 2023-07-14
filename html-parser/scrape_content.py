from html_parser import InformationExtractor
from typing import Callable
import threading
import sys
import json

SRCES: list[str] = ["C:/Users/Andreas Deutsch/Desktop/business/(Deprecated)EuroKatFiles/JGListen/WEN.htm"]

class Scraper:
    @staticmethod
    def get_html_content() -> list[list[str]]:
        threads: list[threading.Thread] = []
        results: list[list[str]] = []

        def execute_and_print(callback: Callable, param: str) -> None:
            result = callback(param)
            """for el in result:
                print(el)
                print("\n\n")"""
            results.extend(result)

        for src in SRCES:
            thread = threading.Thread(target=execute_and_print, args=(InformationExtractor.get_html_content, src))
            threads.append(thread)

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

        return results
    

    @staticmethod
    def get_series_content() -> list[list[str]]:
        threads: list[threading.Thread] = []
        results: list[list[str]] = []

        def execute_and_print(callback: Callable, param: str) -> None:
            result = callback(param)
            """for el in result:
                print(el)
                print("\n\n")"""
            results.extend(result)

        for src in SRCES:
            thread = threading.Thread(target=execute_and_print, args=(InformationExtractor.get_series_content, src))
            threads.append(thread)

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

        return results

    
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


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)  # Convert set to list
        return super().default(obj)

if __name__ == "__main__":
    try:
        data = Scraper.get_html_content()
        Scraper.save_to_json(data)
        series = Scraper.get_series_content()
        Scraper.save_series_to_json(series)
    except KeyboardInterrupt:
        print("Ctrl+C received. Exiting...")
        sys.exit(0)

