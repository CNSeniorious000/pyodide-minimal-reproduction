import extractorSvelte from "@unocss/extractor-svelte";
import { defineConfig, presetWebFonts, presetWind3, transformerDirectives, transformerVariantGroup } from "unocss";

const config = defineConfig({
  extractors: [extractorSvelte()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [presetWind3(), presetWebFonts({ provider: "bunny", fonts: { mono: "Jetbrains mono" } })],
});

export default config;
