import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
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
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onSelect" | "disabled"
> & {
  disabled?: boolean;
  reason: ReactNode;
  onSelect?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
};
