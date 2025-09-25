import React from "react";
import { View, ScrollView, Text } from "react-native";
import HeaderTiny from "../components/HeaderTiny";
import VerticalCard from "../components/VerticalCard";
import globalStyles from "../styles/globalStyles";

const juegos = [
  { id: 1, nombre: "Hollow Knight Silksong", portada: "https://i.ibb.co/JWQcS4q0/imagen-2025-09-24-235146030.png" },
  { id: 2, nombre: "GTA V", portada: "https://i.ibb.co/GvT0Hy8d/imagen-2025-09-24-235440672.png" },
  { id: 3, nombre: "Fortnite", portada: "https://i.ibb.co/PYdZz1j/fantasy-battle.jpg" },
  { id: 4, nombre: "Minecraft", portada: "https://i.ibb.co/6N8DqzH/fantasy-forest.jpg" },
  { id: 5, nombre: "Dark Souls", portada: "https://i.ibb.co/q7Z5x1G/fantasy-castle.jpg" },
];

export default function HomeScreen() {
  return (
    <View style={globalStyles.homeContainer}>
      <HeaderTiny />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={globalStyles.sectionTitle}>Elige tu aventura</Text>
        {juegos.map((juego) => (
          <VerticalCard key={juego.id} juego={juego} />
        ))}
      </ScrollView>
    </View>
  );
}