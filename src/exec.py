from pathlib import Path
from sys import modules
from traceback import format_exception, walk_tb
from types import TracebackType
from typing import TYPE_CHECKING

from js import console
from pyodide.ffi import to_js

if TYPE_CHECKING:
    sources: dict[str, str] = {}


def reload_module(name: str):
    if name in modules:
        del modules[name]
        console.warn("reloading module", name)

        if "." in name:
            parent_module, _ = name.rsplit(".", 1)
            reload_module(parent_module)


for name, content in sources.items():
    path = Path.cwd() / name

    content = content.replace("\r\n", "\n").replace("\r", "\n")

    if not path.is_file() or path.read_text() != content:
        console.log("detected change in", name)

        reload_module(name.replace(".py", "").replace("/", ".").replace(".__init__", ""))
        if not path.parent.is_dir():
            path.parent.mkdir(parents=True)
        path.write_text(content)


ENTRY = "__main__.py"


def num_frames_to_keep(tb: TracebackType | None) -> int:
    keep_frames = False
    kept_frames = 0
    for frame, _ in walk_tb(tb):
        keep_frames = keep_frames or frame.f_code.co_filename == ENTRY
        kept_frames += keep_frames
    return kept_frames


def formattraceback(e: BaseException) -> str:
    """Format the exception that just occurred.

    The actual error object is stored into :py:data:`sys.last_value`.
    """
    nframes = num_frames_to_keep(e.__traceback__)
    return "".join(format_exception(type(e), e, e.__traceback__, -nframes))


async def run():
    from pyodide.code import eval_code_async

    try:
        return to_js([str(await eval_code_async(Path(ENTRY).read_text(), {"__name__": "__main__", "__file__": ENTRY}, filename=ENTRY, return_mode="last_expr_or_assign")), None])
    except BaseException as e:
        return to_js([None, formattraceback(e)])


run
