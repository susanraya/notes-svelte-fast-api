<script lang="ts">
  import { cx } from "./cx";

  let {
    label,
    value = "",
    hint = undefined,
    class: className = "",
  }: { label: string; value?: string | number; hint?: string; class?: string } = $props();
</script>

<div class={cx("rounded-[var(--brand-radius)] border border-slate-200 bg-white p-4", className)}>
  <p class="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
  <p class="mt-1 text-2xl font-semibold text-slate-900" style="font-family: var(--brand-font-heading)">
    {value}
  </p>
  {#if hint}<p class="mt-1 text-xs text-slate-500">{hint}</p>{/if}
</div>
