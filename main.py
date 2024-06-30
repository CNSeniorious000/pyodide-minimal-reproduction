from sys import stderr

from pyodide import __version__

print(f"Hi from pyodide {__version__} ✨", file=stderr)


def f():
    return 1 / 0


f()  # try comment this line


open("main.py").read()
