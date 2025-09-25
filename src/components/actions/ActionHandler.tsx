import React from "react";
import {
  useActions,
  ACTION_TYPES,
  type UseActionsReturnType,
} from "../../hooks/useActions";

type ActionComponent = {
  actionName: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
};

type ActionHandlerProps = {
  actionComponents?: ActionComponent[];
  children: (params: {
    onAction: UseActionsReturnType[1];
    isPopoverOpen: boolean;
  }) => React.ReactNode;
};

export default function ActionHandler({
  actionComponents = [],
  children,
}: ActionHandlerProps) {
  const [state, onAction] = useActions();

  return (
    <>
      {children({
        onAction,
        isPopoverOpen: !!state,
      })}

      {actionComponents.map(
        ({ actionName, component: Component, props = {} }) => {
          if (state === actionName) {
            return (
              <Component key={actionName} onAction={onAction} {...props} />
            );
          }
          return null;
        }
      )}
    </>
  );
}

export { ACTION_TYPES };
