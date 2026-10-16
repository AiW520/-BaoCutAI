import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Menu, Tooltip } from "../dependencies";
type DisabledMenuItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onSelect" | "disabled"
> & {
  disabled?: boolean;
  reason: ReactNode;
  onSelect?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
};
function DisabledMenuItem({
  disabled,
  reason,
  onSelect,
  icon,
  children,
  ...itemProps
}: DisabledMenuItemProps) {
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
}
export { DisabledMenuItem };
