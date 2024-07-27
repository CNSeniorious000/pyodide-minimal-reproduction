<script>
  import Main from "../Main.svelte";
  import { getPy } from "../pyodide";
  import { browser } from "$app/environment";
  import { version } from "pyodide/package.json";

  let t = 0;

  setInterval(() => t++, 1000);
</script>

{#if browser}
  {#await getPy()}
    Initiating Pyodide {version}
    {#if t}({t}s){:else}...{/if}
  {:then py}
    <Main {py} />
  {/await}
{/if}
