"use client";

import React from "react";
import clsx from "clsx";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "small"

const ElementMap: Record<Variant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subtitle: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  small: "span",
};

interface TypographyProps {
  children: React.ReactNode;
  variant: Variant;
  className?: string;
  color?: string; // optional override
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
  color = "text-foreground", // default to your theme foreground
  ...props
}) => {
  let variantClasses: string;

  switch (variant) {
    case "h1":
      variantClasses =
        "text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight";
      break;
    case "h2":
      variantClasses = "text-4xl font-bold leading-snug";
      break;
    case "h3":
      variantClasses = "text-2xl font-semibold leading-snug";
      break;
    case "h4":
      variantClasses = "text-xl font-semibold leading-snug";
      break;
    case "subtitle":
      variantClasses = "text-lg font-medium";
      break;
    case "body1":
      variantClasses = "text-base leading-relaxed";
      break;
    case "body2":
      variantClasses = "text-sm leading-relaxed";
      break;
    case "caption":
      variantClasses = "text-xs";
      break;
    case "overline":
      variantClasses =
        "uppercase tracking-widest text-xs font-medium";
      break;
    case "small":
      variantClasses = "text-sm";
      break;
    default:
      variantClasses = "text-base";
  }

  const Component = ElementMap[variant];

  const finalClasses = clsx(
    variantClasses,
    color, // uses theme token like text-foreground, text-muted-foreground, etc.
    className,
    "font-sans" // maps to var(--font-sans) from your theme
  );

  return (
    <Component className={finalClasses} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
