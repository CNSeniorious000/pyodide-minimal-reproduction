from traceback import format_exception, walk_tb
from types import TracebackType

from pyodide.ffi import to_js


def num_frames_to_keep(tb: TracebackType | None) -> int:
    keep_frames = False
    kept_frames = 0
    for frame, _ in walk_tb(tb):
        keep_frames = keep_frames or frame.f_code.co_filename == "main.py"
        kept_frames += keep_frames
    return kept_frames


def formattraceback(e: BaseException) -> str:
    """Format the exception that just occurred.

    The actual error object is stored into :py:data:`sys.last_value`.
    """
    nframes = num_frames_to_keep(e.__traceback__)
    return "".join(format_exception(type(e), e, e.__traceback__, -nframes))


async def run(source):
    from pyodide.code import eval_code_async

    try:
        return to_js([str(await eval_code_async(source, filename="main.py", return_mode="last_expr_or_assign")), None])
    except BaseException as e:
        return to_js([None, formattraceback(e)])


run
