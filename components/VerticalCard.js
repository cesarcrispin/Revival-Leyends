import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import globalStyles from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';
import imagenes from '../assets/imagenes.json';

export default function VerticalCard({ juego }) {

  const navigation = useNavigation(); 
    
  const handlePress = () => {
    navigation.navigate('DetailScreen', { juegoId: juego.id });
  };

  const imagenEncontrada = imagenes.find(img => img.id === juego.id);
  const imagenUrl = imagenEncontrada ? imagenEncontrada.url : null;

  // Formateo simple del precio
  const precioTexto = juego.precio === 0 ? "Gratis" : `$${juego.precio.toFixed(2)}`;

  return (
    <TouchableOpacity style={globalStyles.verticalCard} onPress={handlePress}>
      <View style={globalStyles.verticalCardContainer}> 
       {<Image 
          source={{ uri: imagenUrl }} 
          style={globalStyles.verticalCardImage} 
        />}
        
        <View style={globalStyles.cardFooter}>
          <Text style={globalStyles.verticalCardTitle} numberOfLines={1}>{juego.nombre}</Text>
          
          
          <Text style={globalStyles.verticalCardTitle}>
              {precioTexto}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

