import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

export function Loading() {
  return (
    <View className="justify-center flex-1 items-center bg-zinc-800">
      <ActivityIndicator color={colors.emerald[600]} />
    </View>
  );
}
