import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import globalStyles from "../styles/globalStyles";

export default function VerticalCard({ juego }) {
  return (
    <View style={globalStyles.verticalCard}>
      <Image source={{ uri: juego.portada }} style={globalStyles.verticalCardImage} />
      <View style={globalStyles.cardFooter}>
        <Text style={globalStyles.verticalCardTitle}>{juego.nombre}</Text>
        <TouchableOpacity style={globalStyles.unlockButton}>
          <Text style={globalStyles.unlockButtonText}>Desbloquear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

