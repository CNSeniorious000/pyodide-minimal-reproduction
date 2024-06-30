import packageJson from "../package.json?raw";
import { cacheSingleton } from "./utils";
import { toast } from "svelte-sonner";

export const {
  dependencies: { pyodide: version },
} = JSON.parse(packageJson);

let indexURL = `https://cdn.jsdelivr.net/pyodide/v${version}/full/`; // official cdn
indexURL = `https://cdn.promplate.dev/pyodide/v${version}/`; // to prevent 429

export const getPy = cacheSingleton(async () => {
  const { loadPyodide } = await import("pyodide");
  const py = await loadPyodide({ indexURL });
  py.setStdout({ batched: toast });
  py.setStderr({ batched: toast.warning });
  py.globals.set("input", prompt);
  // @ts-expect-error for debugging
  window.pyodide = window.py = py;
  return py;
});
