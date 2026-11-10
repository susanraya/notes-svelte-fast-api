<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  const VARIANTS: Record<string, string> = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    accent: "text-white",
  };

  let {
    variant = "default",
    class: className = "",
    children,
    ...rest
  }: { variant?: string; class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<span
  {...rest}
  class={cx(
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
    VARIANTS[variant] ?? VARIANTS.default,
    className,
  )}
  style:background-color={variant === "accent" ? "var(--brand-accent)" : undefined}
>
  {@render children?.()}
</span>
