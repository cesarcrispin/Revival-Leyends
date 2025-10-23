import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen.js";
import MainTabs from "./MainTabs.js";
import DetailScreen from "../Screens/DetailScreen.js";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main">
          {(props) => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      )}
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' } 
      }}

      />
    </Stack.Navigator>
  );
}
