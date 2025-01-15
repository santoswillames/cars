import { useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import colors from "tailwindcss/colors";
import { View } from "react-native";

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = colors.zinc[800];
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  return (
    <View className="flex-1 bg-zinc-800">
      <NavigationContainer theme={theme}>
        {isAuthenticate ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
