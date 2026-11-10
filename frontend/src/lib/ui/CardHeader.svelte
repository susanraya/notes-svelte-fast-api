<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<div {...rest} class={cx("flex flex-col gap-1 p-5 pb-3", className)}>{@render children?.()}</div>
