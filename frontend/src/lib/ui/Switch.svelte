<script lang="ts">
  import { cx } from "./cx";

  let { checked = $bindable(false), class: className = "" }: { checked?: boolean; class?: string } =
    $props();
</script>

<label class={cx("inline-flex cursor-pointer items-center", className)}>
  <input type="checkbox" bind:checked class="peer sr-only" />
  <span
    class="relative h-5 w-9 rounded-full bg-slate-300 transition-colors peer-checked:bg-[var(--brand-primary)]"
    aria-hidden="true"
  >
    <span
      class="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"
    ></span>
  </span>
</label>
