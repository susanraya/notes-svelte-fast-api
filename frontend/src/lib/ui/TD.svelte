<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<td {...rest} class={cx("px-3 py-2.5 text-slate-700", className)}>{@render children?.()}</td>
