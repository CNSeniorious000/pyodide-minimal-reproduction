import extractorSvelte from "@unocss/extractor-svelte";
import { defineConfig, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss";

const config = defineConfig({
  extractors: [extractorSvelte()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [presetUno(), presetWebFonts({ provider: "bunny", fonts: { mono: "Jetbrains mono" } })],
});

export default config;
