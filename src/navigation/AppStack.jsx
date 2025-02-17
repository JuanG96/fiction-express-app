import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Library from "../screens/Library";

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Library" component={Library} />
  </Stack.Navigator>
);
