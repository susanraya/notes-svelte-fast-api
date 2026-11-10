<script lang="ts">
  import { ICONS } from "./icons";

  let {
    name,
    size = 16,
    class: className = "",
    ...rest
  }: { name: string; size?: number; class?: string; [key: string]: unknown } = $props();
</script>

<svg
  {...rest}
  class={className}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {#each ICONS[name] ?? [] as [tag, attributes], index (index)}
    {#if tag === "path"}<path {...attributes} />{:else if tag === "circle"}<circle
        {...attributes}
      />{:else}<rect {...attributes} />{/if}
  {/each}
</svg>
