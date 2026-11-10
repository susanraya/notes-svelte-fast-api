<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    class: className = "",
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<!-- The scroll wrapper is the root; what the screen sets belongs on the table. -->
<div class="w-full overflow-x-auto">
  <table {...rest} class={cx("w-full border-collapse text-sm", className)}>
    {@render children?.()}
  </table>
</div>
