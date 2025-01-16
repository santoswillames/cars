import { Text } from "react-native";

interface HeaderTextProps {
  text: string;
}

export function HeaderText({ text }: HeaderTextProps) {
  return <Text className="text-white text-xl">{text}</Text>;
}
