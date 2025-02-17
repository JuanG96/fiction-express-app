import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
