<script lang="ts">
  import { cx } from "./cx";

  let {
    name = "",
    src = undefined,
    class: className = "",
  }: { name?: string; src?: string; class?: string } = $props();

  const initials = $derived(
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join(""),
  );
</script>

<span
  class={cx(
    "inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full",
    "bg-slate-200 text-xs font-medium text-slate-600",
    className,
  )}
>
  {#if src}<img {src} alt={name} class="h-full w-full object-cover" />{:else}{initials}{/if}
</span>
