import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Model } from "../screens/Model";

type AppRoutes = {
  home: undefined;
  model: { brandCode: string };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="model" component={Model} />
    </Navigator>
  );
}
