<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<div {...rest} class={cx("flex items-center gap-2 border-t border-slate-100 p-5", className)}>{@render children?.()}</div>
