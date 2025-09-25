import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Castle, ScrollText, Package, Shield } from "lucide-react-native";

import HomeScreen from "../Screens/HomeScreen.js";
import OffersScreen from "../Screens/OffersScreen.js";
import CartScreen from "../Screens/CartScreen.js";
import ProfileScreen from "../Screens/ProfileScreen.js";

const Tab = createBottomTabNavigator();

export default function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const size = 22;
          if (route.name === "Inicio") return <Castle size={size} color={color} />;
          if (route.name === "Mercado") return <ScrollText size={size} color={color} />;
          if (route.name === "Tesoro") return <Package size={size} color={color} />;
          if (route.name === "Perfil") return <Shield size={size} color={color} />;
        },
        tabBarActiveTintColor: "#d4af37",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#1a1a1a", borderTopColor: "#d4af37", height: 55 },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Mercado" component={OffersScreen} />
      <Tab.Screen name="Tesoro" component={CartScreen} />
      <Tab.Screen name="Perfil">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}