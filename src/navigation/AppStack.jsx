import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Library from "../screens/Library";
import ReadBook from "../screens/ReadBook";

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Library" component={Library} />
    <Stack.Screen name="ReadBook" component={ReadBook} />
  </Stack.Navigator>
);
