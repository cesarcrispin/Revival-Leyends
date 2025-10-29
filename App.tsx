import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { JuegosProvider } from "./context/JuegosContext.js";
import { AuthProvider } from "./context/AuthContext.js";
import { CartProvider } from "./context/CartContext.js";
import RootStack from "./navigation/RootStack.js"; 

export default function App() {
  return (
    <AuthProvider>
      <JuegosProvider>
        <CartProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </CartProvider>
      </JuegosProvider>
    </AuthProvider>
  );
}
