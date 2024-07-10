from sys import stderr

from pyodide import __version__

from .error import *

print(f"Hi from pyodide {__version__} ✨", file=stderr)
