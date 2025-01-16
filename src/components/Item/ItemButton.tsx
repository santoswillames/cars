import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ItemButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function ItemButton({ children, ...rest }: ItemButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
      className="flex-row justify-between items-center w-full p-1"
    >
      {children}
    </TouchableOpacity>
  );
}
