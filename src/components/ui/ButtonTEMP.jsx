import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | outline | danger | subtle
  size = "md", // sm | md | lg
  fullWidth = true,
  disabled = false,
  loading = false,
  className = "",
}) {
  // 🎨 Base styles
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition active:scale-95";

  // 📏 Sizes
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // 🎨 Variants
  const variants = {
    primary:
      "bg-amber-500 hover:bg-amber-600 text-white shadow-md focus:ring-2 focus:ring-amber-400",
    outline:
      "border border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-2 focus:ring-amber-400",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-400",
    subtle:
      "bg-stone-100 hover:bg-stone-200 text-stone-800 focus:ring-2 focus:ring-stone-300",
  };

  // 🧩 Combine
  const classes = `
    ${base}
    ${sizes[size]}
    ${variants[variant]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
