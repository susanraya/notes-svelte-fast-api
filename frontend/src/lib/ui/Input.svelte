<script lang="ts">
  import { cx } from "./cx";

  let {
    value = $bindable(),
    class: className = "",
    ...rest
  }: { value?: string | number; class?: string; [key: string]: unknown } = $props();
</script>

<input bind:value {...rest} class={cx("w-full rounded-[var(--brand-radius)] border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]", "h-9", className)} />
