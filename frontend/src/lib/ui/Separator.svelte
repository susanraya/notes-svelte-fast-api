<script lang="ts">
  import { cx } from "./cx";

  let { class: className = "" }: { class?: string } = $props();
</script>

<hr class={cx("border-slate-200", className)} />
