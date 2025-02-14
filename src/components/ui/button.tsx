import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";
import { useExtendChildren, useExtendClassName } from "./helper";
import type { ExtendProps, OmitProps } from "./type";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = OmitProps<React.ComponentProps<"button">> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  } & ExtendProps<{ isLoading?: boolean; disabled?: boolean }>;
const Button: React.FC<ButtonProps> = ({
  className: _className,
  isLoading,
  disabled,
  children,
  render,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  const className = useExtendClassName({
    context: { disabled, isLoading },
    className: _className,
  });

  const jsxToDisplay = useExtendChildren({
    children,
    render,
    context: { disabled, isLoading },
  });

  if (isLoading) {
    return (
      <Comp
        disabled={disabled}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}>
        <Loader2 className="animate-spin" />
        {jsxToDisplay}
      </Comp>
    );
  }

  return (
    <Comp
      disabled={disabled}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      {jsxToDisplay}
    </Comp>
  );
};
export default Button;
