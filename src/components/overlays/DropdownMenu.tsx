import React from "react";
import ItemList from "../common/ItemList";
import type { ActionComponent as ChatActionComponent } from "../chatList/actionHandler/types";
import type { ActionComponent as MessageActionComponent } from "../messageList/actionHandler/types";

type DropdownMenuProps = {
  dropdownItems: ChatActionComponent[] | MessageActionComponent[];
  variant?: "ghost" | "solid";
  size?: "sm" | "md" | "lg";
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
};

export default function DropdownMenu({
  dropdownItems,
  variant = "ghost",
  size = "md",
  className = "",
  isOpen,
  onToggle,
}: DropdownMenuProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggle();
  };

  const baseStyles =
    "rounded-full transition-all duration-200 flex items-center justify-center";
  const variantStyles = {
    ghost: "hover:bg-gray-600/50 text-gray-300 hover:text-white",
    solid: "bg-gray-600 hover:bg-gray-500 text-white",
  };
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="absolute top-full right-0 mt-1 w-48 bg-[rgb(32,44,51)] rounded-lg shadow-xl border border-gray-600/50 py-1 z-50">
            <ItemList
              items={dropdownItems}
              renderItem={(item) => (
                <button
                  onClick={() => {
                    item.onClick();
                    onToggle();
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-600/30 hover:text-white transition-colors duration-150 flex items-center gap-3"
                >
                  <span className="font-medium">{item.actionName}</span>
                </button>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
}
