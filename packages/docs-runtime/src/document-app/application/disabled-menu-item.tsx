import type { ReactNode } from "react";
import type { MenuItemProps } from "../../design-system/menu/items";
import { Menu, Tooltip } from "../dependencies";
import type * as React from "react";

export const DisabledMenuItem: React.FC<DisabledMenuItemProps> = ({
  disabled,
  reason,
  onSelect,
  icon,
  children,
  ...itemProps
}) => {
  const item = (
    <Menu.Item {...itemProps} disabled={disabled} onClick={onSelect} icon={icon}>
      {children}
    </Menu.Item>
  );
  return disabled ? (
    <Tooltip content={reason} side={`right`} delay={300}>
      <span className={`block`}>{item}</span>
    </Tooltip>
  ) : (
    item
  );
};

type DisabledMenuItemProps = Omit<
  MenuItemProps,
  "onSelect" | "disabled"
> & {
  disabled?: boolean;
  reason: ReactNode;
  onSelect?: MenuItemProps["onClick"];
  icon?: ReactNode;
};
