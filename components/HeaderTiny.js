import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";
import globalStyles from "../styles/globalStyles";

export default function HeaderTiny() {
  return (
    <View style={globalStyles.headerTiny}>
      <View style={globalStyles.logoContainer}>
        <Image
          source={{ uri: "https://i.ibb.co/k6qqQ4tn/imagen-2025-09-24-185531485.png" }}
          style={globalStyles.logoImage}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={globalStyles.searchButton}>
        <Search size={24} color="#d4af37" />
      </TouchableOpacity>
    </View>
  );
}