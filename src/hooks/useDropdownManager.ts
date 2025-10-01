import { useState, useEffect, useCallback, useRef } from "react";

let globalOpenDropdownId: string | null = null;

function notifyDropdownChange() {
  document.dispatchEvent(new CustomEvent("dropdown-change"));
}

export function useDropdownManager(dropdownId: string) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    if (globalOpenDropdownId === dropdownId) {
      globalOpenDropdownId = null;
      setIsOpen(false);
    } else {
      globalOpenDropdownId = dropdownId;
      setIsOpen(true);
    }
    notifyDropdownChange();
  }, [dropdownId]);

  const close = useCallback(() => {
    if (globalOpenDropdownId === dropdownId) {
      globalOpenDropdownId = null;
      setIsOpen(false);
      notifyDropdownChange();
    }
  }, [dropdownId]);

  useEffect(() => {
    const handleDropdownChange = () => {
      setIsOpen(globalOpenDropdownId === dropdownId);
    };

    document.addEventListener("dropdown-change", handleDropdownChange);
    return () => {
      document.removeEventListener("dropdown-change", handleDropdownChange);
    };
  }, [dropdownId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  return { isOpen, toggle, close, dropdownRef };
}
