"use client";
import React from "react";
import clsx from "clsx";

const Button = ({
    type = "button",
    text,
    onClick,
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    icon: Icon,
    className = "",
}) => {
    const baseStyles =
        "flex items-center justify-center gap-2 relative rounded-md font-medium transition-all duration-300 focus:outline-none";

    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    const variantStyles = {
        primary: "bg-primary text-white hover:bg-opacity-90",
        secondary: "bg-secondary text-white hover:bg-opacity-90",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    // ✅ Disabled styles - Matches the variant but in a "disabled" look
    const disabledStyles = {
        primary: "bg-gray-400 text-gray-100 cursor-not-allowed hover:bg-gray-400",
        secondary: "bg-gray-500 text-gray-200 cursor-not-allowed hover:bg-gray-500",
        outline: "border-gray-400 text-gray-400 cursor-not-allowed hover:bg-transparent",
        danger: "bg-gray-400 text-gray-200 cursor-not-allowed hover:bg-gray-400",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={clsx(
                baseStyles,
                sizeStyles[size],
                disabled ? disabledStyles[variant] : variantStyles[variant], // ✅ Apply disabled styling properly
                className || ""
            )}
        >
            {/* ✅ Hide text & icon when loading but maintain button size */}
            <span className={clsx("flex items-center gap-2", isLoading && "opacity-0")}>
                {text}
                {Icon && <Icon className="w-5 h-5" />}
            </span>

            {/* ✅ Centered loader that replaces text when loading */}
            {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                </span>
            )}
        </button>
    );
};

export default Button;
