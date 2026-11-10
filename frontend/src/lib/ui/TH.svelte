<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<th {...rest} class={cx("px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500", className)}>{@render children?.()}</th>
