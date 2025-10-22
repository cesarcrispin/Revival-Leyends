import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { JuegosProvider } from "./context/JuegosContext.js";
import RootStack from "./navigation/RootStack.js"; 

export default function App() {
  return (
    <JuegosProvider>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    </JuegosProvider>
  );
}
