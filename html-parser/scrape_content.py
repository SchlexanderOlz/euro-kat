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
    def save_to_json(data: any):
        filename = "data.json"
        with open(filename, "w") as file:
            json.dump(data, file, cls=SetEncoder)

    @staticmethod
    def cleanup(data: list[dict]):
        for series in data:
            sub_series_names = []
            new_sub_series_list = []

            for sub in series["subSeries"]:
                if sub["name"] not in sub_series_names:
                    sub_series_names.append(sub["name"])
                    new_sub_series_list.append({
                        "name": sub["name"],
                        "figures": sub["figures"]
                    })
                else:
                    for existing_sub in new_sub_series_list:
                        if existing_sub["name"] == sub["name"]:
                            existing_sub["figures"].extend(sub["figures"])
                            break

            series["subSeries"] = new_sub_series_list


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return super().default(obj)


if __name__ == "__main__":
    try:
        html_buff: list = []
        html_content_thread = threading.Thread(
            target=Scraper.get_html_content, args=(html_buff,)
        )
        html_content_thread.start()

        html_content_thread.join()

        Scraper.cleanup(html_buff)
        Scraper.save_to_json(html_buff)
    except KeyboardInterrupt:
        print("Ctrl+C received. Exiting...")
        sys.exit(0)
