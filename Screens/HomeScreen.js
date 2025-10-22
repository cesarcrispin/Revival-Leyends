import React, {useContext} from "react";
import { View, ScrollView, Text, ActivityIndicator, StyleSheet } from "react-native";
import HeaderTiny from "../components/HeaderTiny";
import VerticalCard from "../components/VerticalCard";
import globalStyles from "../styles/globalStyles";
import { JuegosContext } from "../context/JuegosContext";


export default function HomeScreen() {
  const { juegos, cargando, error } = useContext(JuegosContext);

  if (cargando) {
    return (
      <View style={[globalStyles.homeContainer, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" /> 
        <Text style={styles.loadingText}>Cargando catálogo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[globalStyles.homeContainer, styles.centerContent]}>
        <Text style={styles.errorText}>⚠️ Error: {error}</Text>
        <Text style={styles.errorHint}>Revisa tu conexión o reglas de Firebase.</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  loadingText: { marginTop: 10, fontSize: 16, color: '#007AFF', },
  errorText: { fontSize: 18, fontWeight: 'bold', color: '#FF3B30', textAlign: 'center', marginBottom: 5, },
  errorHint: { fontSize: 14, color: '#8E8E93', textAlign: 'center', }
});