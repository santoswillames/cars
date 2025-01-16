import { ElementType } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

interface HeaderActionProps extends TouchableOpacityProps {
  icon: ElementType;
}

export function HeaderAction({ icon: Icon, ...rest }: HeaderActionProps) {
  return (
    <TouchableOpacity activeOpacity={0.9} {...rest}>
      <Icon color={colors.zinc[100]} />
    </TouchableOpacity>
  );
}
