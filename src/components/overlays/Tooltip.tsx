import { useState, useRef, cloneElement, isValidElement } from "react";

type TooltipProps = {
  content: string;
  children: React.ReactElement;
};

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const childRef = useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    if (childRef.current) {
      setIsTruncated(
        childRef.current.scrollWidth > childRef.current.clientWidth
      );
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const childWithProps = isValidElement(children)
    ? cloneElement(children, {
        ref: childRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      } as any)
    : children;

  return (
    <div className="relative inline-block">
      {childWithProps}

      {isVisible && content && isTruncated && (
        <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-[rgb(42,55,63)] text-white text-sm rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-gray-600/50 z-[99999] pointer-events-none max-w-xs animate-in fade-in duration-200">
          {/* Arrow pointing up */}
          <div className="absolute bottom-full left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[rgb(42,55,63)]" />
          <div className="break-words">{content}</div>
        </div>
      )}
    </div>
  );
}
