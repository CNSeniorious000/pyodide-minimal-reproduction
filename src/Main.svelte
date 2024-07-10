<script lang="ts">
  import type { PyodideInterface } from "pyodide";
  import type { PyProxy } from "pyodide/ffi";

  import sources from "..";
  import exec from "./exec.py?raw";

  export let py: PyodideInterface;

  py.globals.set("sources", py.toPy(sources));

  const run: PyProxy & (() => Promise<any>) = py.runPython(exec);
</script>

{#await run() then [result, traceback]}
  {#if !traceback}
    <div class="text-green-3">
      {result}
    </div>
  {:else}
    <div class="text-red-4">
      {traceback}
    </div>
  {/if}
{/await}
