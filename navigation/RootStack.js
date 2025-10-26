import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext.js"; 
import LoginScreen from "../Screens/LoginScreen.js";
import RegisterScreen from "../Screens/RegisterScreen.js";
import MainTabs from "./MainTabs.js";
import DetailScreen from "../Screens/DetailScreen.js";


const Stack = createNativeStackNavigator();

export default function RootStack() {

  const { user, isLoading } = useContext(AuthContext); 

    if (isLoading) {
    //componente de carga (ej. <LoadingScreen
    // Por ahora se va a devolver un View vacío.
    return <></>; 
  }
  

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    initialRouteName={user ? "Main" : "Login"}>
        
        {/* Pantallas de Autenticación */}
       
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* Pantalla Principal (Tabs) */}
        
          <Stack.Screen name="Main" component={MainTabs} />

        {/* Pantalla de Detalle */}
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
         
        </Stack.Navigator>);
}
