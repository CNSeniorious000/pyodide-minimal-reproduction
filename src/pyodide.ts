import type { PyProxyWithSet } from "pyodide/ffi";

import packageJson from "../package.json?raw";
import { cacheSingleton } from "./utils";
import { tick } from "svelte";
import { toast } from "svelte-sonner";

export const {
  dependencies: { pyodide: version },
} = JSON.parse(packageJson);

let indexURL = `https://cdn.jsdelivr.net/pyodide/v${version}/full/`; // official cdn
indexURL = `https://cdn.promplate.dev/pyodide/v${version}/`; // to prevent 429

export const getPy = cacheSingleton(async () => {
  const { loadPyodide } = await import("pyodide");
  const py = await loadPyodide({ indexURL });
  py.setStdout({ batched: output => tick().then(() => toast.message(output)) });
  py.setStderr({ batched: output => tick().then(() => toast.warning(output)) });
  const globals = py.globals as PyProxyWithSet;
  globals.set("input", prompt);
  globals.set("toast", toast);
  // @ts-expect-error for debugging
  window.pyodide = window.py = py;
  return py;
});
