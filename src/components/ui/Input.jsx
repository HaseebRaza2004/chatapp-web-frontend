import React from "react";

export default function Input({
  id,
  name,
  type = "text",
  placeholder = "",
  label,
  icon,
  rightIcon,
  className = "",
  fullWidth = true,
  error,
  register, // if provided, spread into input
  value,
  onChange,
  inputMode,
  ...rest
}) {
  const baseWrapper = `flex items-center gap-3 rounded-lg border px-3 py-3 bg-white shadow-sm focus-within:ring-2 transition ${className}`;
  const errorClasses = error
    ? "border-red-500 focus-within:ring-red-400"
    : "border-stone-300 focus-within:border-amber-500 focus-within:ring-amber-400";

  return (
    <div className={`w-full ${fullWidth ? "" : "inline-block"}`}>
      {label && <label htmlFor={id || name} className="block text-sm text-gray-600 mb-1">{label}</label>}

      <div className={`${baseWrapper} ${errorClasses}`}>
        {icon && <div className="shrink-0 text-gray-500">{icon}</div>}

        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full outline-none text-gray-700 placeholder:text-gray-400"
          {...(register ? register : {})}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          {...rest}
        />

        {rightIcon && <div className="shrink-0 text-gray-400">{rightIcon}</div>}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
