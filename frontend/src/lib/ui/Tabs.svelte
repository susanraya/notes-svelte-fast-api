<script lang="ts">
  import { cx } from "./cx";

  let {
    tabs = [],
    value = $bindable(),
    class: className = "",
  }: { tabs?: Array<{ key: string; label: string }>; value?: string; class?: string } = $props();
</script>

<div class={cx("flex gap-1 border-b border-slate-200", className)}>
  {#each tabs as tab (tab.key)}
    <button
      onclick={() => (value = tab.key)}
      class={cx(
        "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
        tab.key === value
          ? "border-[var(--brand-primary)] text-slate-900"
          : "border-transparent text-slate-500 hover:text-slate-800",
      )}
    >
      {tab.label}
    </button>
  {/each}
</div>
