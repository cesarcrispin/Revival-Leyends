import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { JuegosProvider } from "./context/JuegosContext.js";
import { AuthProvider } from "./context/AuthContext.js";
import RootStack from "./navigation/RootStack.js"; 

export default function App() {
  return (
    <AuthProvider>
      <JuegosProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </JuegosProvider>
    </AuthProvider>
  );
}
