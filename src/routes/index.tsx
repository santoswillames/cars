import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import colors from "tailwindcss/colors";
import { View } from "react-native";
import { useAuth } from "../hooks/userAuth";
import { Loading } from "../components/Loading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.zinc[800];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-zinc-800">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
