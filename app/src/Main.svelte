<script lang="ts">
  import type { PyodideInterface } from "pyodide";
  import type { PyProxy } from "pyodide/ffi";

  import sources from "../../python";
  import exec from "./exec.py?raw";

  export let py: PyodideInterface;

  py.globals.set("sources", py.toPy(sources));

  const run: PyProxy & (() => Promise<any>) = py.runPython(exec);
</script>

{#await run() then [result, traceback]}
  {#if !traceback}
    <div class="green">
      {result}
    </div>
  {:else}
    <div class="red">
      {traceback}
    </div>
  {/if}
{/await}

<style>
  .green {
    --uno: text-green-3;
  }

  .green::selection {
    --uno: bg-green-3/15;
  }

  .red {
    --uno: text-red-4;
  }

  .red::selection {
    --uno: bg-red-4/15;
  }
</style>
