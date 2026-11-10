<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<h3 {...rest} class={cx("text-base font-semibold tracking-tight text-slate-900", className)} style="font-family: var(--brand-font-heading)">{@render children?.()}</h3>
