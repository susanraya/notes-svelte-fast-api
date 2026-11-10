<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  let {
    value = $bindable(),
    options = [],
    class: className = "",
    children,
    ...rest
  }: {
    value?: string | number;
    options?: Array<{ value: string; label: string }>;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  } = $props();
</script>

<select bind:value {...rest} class={cx("w-full rounded-[var(--brand-radius)] border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]", "h-9", className)}>
  {#if children}
    {@render children()}
  {:else}
    {#each options as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  {/if}
</select>
