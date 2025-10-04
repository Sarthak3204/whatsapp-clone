import React, { type ReactElement, useRef, useEffect } from "react";
import { SLOT_NAMES } from "./constants";
import type {
  SlotProps,
  ChatViewLayoutProps,
  ChatViewLayoutType,
} from "./types";

const Slot = (_props: SlotProps) => null;

const ChatViewLayout: ChatViewLayoutType = ({
  children,
  autoScroll = true,
}: ChatViewLayoutProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const slots: Record<string, React.ReactNode> = {};

  if (children) {
    React.Children.forEach(children, (child: ReactElement<SlotProps>) => {
      if (child?.props?.name) {
        slots[child.props.name] = child.props.children;
      }
    });
  }

  useEffect(() => {
    if (autoScroll && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [slots[SLOT_NAMES.BODY], autoScroll]);

  return (
    <>
      {slots[SLOT_NAMES.HEADER] && (
        <div className="bg-black border-b z-20">{slots[SLOT_NAMES.HEADER]}</div>
      )}

      {slots[SLOT_NAMES.BODY] && (
        <div ref={scrollContainerRef} className="flex-1 z-10 overflow-y-auto">
          {slots[SLOT_NAMES.BODY]}
        </div>
      )}

      {slots[SLOT_NAMES.FOOTER] && (
        <div className="z-20">{slots[SLOT_NAMES.FOOTER]}</div>
      )}
    </>
  );
};

ChatViewLayout.Slot = Slot;

export default ChatViewLayout;
