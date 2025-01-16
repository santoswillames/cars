import { ReactNode } from "react";
import { View } from "react-native";

interface HeaderRootProps {
  children: ReactNode;
}

export function HeaderRoot({ children }: HeaderRootProps) {
  return (
    <View className="bg-zinc-700 pt-16 pb-5 px-8 justify-between flex-row">
      {children}
    </View>
  );
}
