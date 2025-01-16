import { ReactNode } from "react";
import { View } from "react-native";

interface ItemRootProps {
  children: ReactNode;
}

export function ItemRoot({ children }: ItemRootProps) {
  return (
    <View className="flex-row bg-zinc-700 items-center justify-between py-5 px-4 mb-3 rounded-md">
      {children}
    </View>
  );
}
