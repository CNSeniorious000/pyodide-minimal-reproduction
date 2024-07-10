<script>
  import "@unocss/reset/tailwind-compat.css";
  import "uno.css";

  import { Toaster } from "svelte-sonner";
</script>

<main class="lg:text-md fixed inset-0 grid m-auto h-fit w-fit place-items-center gap-2em ws-pre-wrap p-5 text-xs font-mono [&>div]:(w-full b-1 b-current p-5) md:text-sm !line-height-relaxed">
  <slot />
</main>

<Toaster theme="dark" richColors />

<style>
  :global(html) {
    --uno: bg-neutral-9 text-neutral-1;
  }
</style>
