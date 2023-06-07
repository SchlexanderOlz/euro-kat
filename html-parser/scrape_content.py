from html_parser import InformationExtractor
from typing import Callable
import threading

SRCES: list[str] = {"I:/Code/(Deprecated)EuroKatFiles/JGListen/WSE.htm", "I:/Code/(Deprecated)EuroKatFiles/JGListen/WEN.htm"}

class Scraper:

    @staticmethod
    def get_html_content() -> list[list[str]]:
        threads: list[threading.Thread] = []
        results: list[list[str]] = []

        def execute_and_print(callback: Callable, param: str) -> None:
            result = callback(param)
            results.append(result)

        for src in SRCES:
            thread = threading.Thread(target=execute_and_print, args=(InformationExtractor.get_html_content, src))
            threads.append(thread)

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

        return results


if __name__ == "__main__":
    print(Scraper.get_html_content())