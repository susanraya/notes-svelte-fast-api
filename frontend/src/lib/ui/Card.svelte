<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<div {...rest} class={cx("rounded-[var(--brand-radius)] border border-slate-200 bg-white shadow-sm", className)}>{@render children?.()}</div>
