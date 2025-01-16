import { ElementType } from "react";
import colors from "tailwindcss/colors";

interface ItemIconProps {
  icon: ElementType;
}

export function ItemIcon({ icon: Icon }: ItemIconProps) {
  return <Icon color={colors.zinc[300]} size={20} />;
}
