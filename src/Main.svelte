<script lang="ts">
  import type { PyodideInterface } from "pyodide";
  import type { PyProxy } from "pyodide/ffi";

  import main from "../main.py?raw";
  import exec from "./exec.py?raw";

  export let py: PyodideInterface;

  py.FS.writeFile("main.py", main);

  const run: PyProxy & ((source: string) => Promise<any>) = py.runPython(exec);
</script>

{#await run(main) then [result, traceback]}
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
