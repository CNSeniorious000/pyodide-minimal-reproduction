<script lang="ts">
  import type { PyodideInterface } from "pyodide";
  import type { PyProxy } from "pyodide/ffi";

  import source from "../main.py?raw";

  export let py: PyodideInterface;

  py.FS.writeFile("main.py", source);

  const run: PyProxy & ((source: string) => Promise<any>) = py.runPython(`
    async def run(source):
      from pyodide.code import eval_code_async
      return str(await eval_code_async(source, filename="main.py", return_mode="last_expr_or_assign"))
    run
  `);
</script>

{#await run(source) then result}
  <div class="text-green-3">
    {result}
  </div>
{:catch error}
  <div class="text-red-4">
    {error.message}
  </div>
{/await}
