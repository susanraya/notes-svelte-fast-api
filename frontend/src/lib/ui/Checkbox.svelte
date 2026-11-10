<script lang="ts">
  import { cx } from "./cx";

  let {
    checked = $bindable(false),
    class: className = "",
    ...rest
  }: { checked?: boolean; class?: string; [key: string]: unknown } = $props();
</script>

<input
  type="checkbox"
  bind:checked
  {...rest}
  class={cx("h-4 w-4 rounded border-slate-300 accent-[var(--brand-primary)]", className)}
/>
