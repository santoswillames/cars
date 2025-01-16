import { Text } from "react-native";

interface ItemTextProps {
  text: string;
}

export function ItemText({ text }: ItemTextProps) {
  return <Text className="text-zinc-300 text-xl">{text}</Text>;
}
