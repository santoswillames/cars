import { View, Text } from "react-native";

interface ListEmptyProps {
  message: string;
}

export function ListEmpty({ message }: ListEmptyProps) {
  return (
    <View className="items-center justify-center">
      <Text className="text-white text-xl mb-4">{message}</Text>
    </View>
  );
}
