<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx } from "./cx";

  const VARIANTS: Record<string, string> = {
    primary: "text-white shadow-sm hover:opacity-90",
    secondary: "border bg-white hover:bg-slate-50",
    ghost: "hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const SIZES: Record<string, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-6 text-base",
  };

  let {
    variant = "primary",
    size = "md",
    class: className = "",
    children,
    ...rest
  }: {
    variant?: string;
    size?: string;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  } = $props();
</script>

<button
  {...rest}
  class={cx(
    "inline-flex items-center justify-center gap-2 rounded-[var(--brand-radius)] font-medium",
    "transition-colors focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  )}
  style:background-color={variant === "primary" ? "var(--brand-primary)" : undefined}
>
  {@render children?.()}
</button>
