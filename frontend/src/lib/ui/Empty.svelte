<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    title,
    description = undefined,
    action = undefined,
    class: className = "",
    children,
  }: {
    title: string;
    description?: string;
    action?: Snippet;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<div
  class={cx(
    "flex flex-col items-center justify-center gap-2 rounded-[var(--brand-radius)]",
    "border border-dashed border-slate-300 px-6 py-12 text-center",
    className,
  )}
>
  <p class="text-sm font-medium text-slate-900">{title}</p>
  {#if description}<p class="max-w-sm text-sm text-slate-500">{description}</p>{/if}
  {@render (action ?? children)?.()}
</div>
