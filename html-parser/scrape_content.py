from html_parser import InformationExtractor
from parse_special import ExtraParser, WarningParser
from typing import Callable
import threading
import sys
import json
import base64
import os

SRCES: list[str] = [
    "I:/ActEuroKat/JGListen/W2S.htm",
    ]


quiet: bool = False

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        if isinstance(obj, bytes):
            return base64.b64encode(obj).decode('utf-8')
        return super().default(obj)

class Scraper:
    @staticmethod
    def get_html_content(buff: list) -> list[list[str]]:
        threads: list[threading.Thread] = []

        def execute_and_print(callback: Callable, param: str) -> None:
            result = callback(param)
            buff.extend(result)

        for src in SRCES:
            thread = threading.Thread(
                target=execute_and_print,
                args=(InformationExtractor.get_html_content, src),
            )
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

    @staticmethod
    def save_to_json(name: str, data: any):
        filename = "{}.json".format(name)
        with open(filename, "w") as file:
            json.dump(data, file, cls=SetEncoder)

    @staticmethod
    def cleanup(data: list[dict]):
        series_names: list[str] = []
        y: int = 0
        while y < len(data):
            series = data[y]
            try:
                found_series_at: int = series_names.index(series["seriesLetter"])
                new_series: dict = data[found_series_at]
                new_series["subSeries"].extend(series["subSeries"])

                data.pop(y)
            except ValueError:
                y += 1
                series_names.append(series["seriesLetter"])

            sub_seris_names: list[str] = []
            i: int = 0
            while i < len(series["subSeries"]):
                sub: dict = series["subSeries"][i]
                try:
                    found_at: int = sub_seris_names.index(sub["name"])
                    sub_series: dict = series["subSeries"][found_at]
                    sub_series["figures"].extend(sub["figures"])

                    series["subSeries"].pop(i)
                except ValueError:
                    i += 1
                    sub_seris_names.append(sub["name"])


if __name__ == "__main__":
    warnings: list = WarningParser.parse_deez("I:\\Code\\(Deprecated)EuroKatFiles\\n_whz\\whzliste.htm")
    extras: list = ExtraParser.sugg_on("I:\\Code\\(Deprecated)EuroKatFiles\\n_zwz\zwzliste.htm")
    Scraper.save_to_json("warnings", warnings)
    Scraper.save_to_json("extras", extras)
    try:
        html_buff: list = []
        Scraper.get_html_content(html_buff)

        Scraper.cleanup(html_buff)
        Scraper.save_to_json("data", html_buff)
    except KeyboardInterrupt:
        print("Ctrl+C received. Exiting...")
        sys.exit(0)


