import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import globalStyles from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';

export default function VerticalCard({ juego }) {

  const navigation = useNavigation(); 
  
  const handlePress = () => {
    navigation.navigate('DetailScreen', { juegoId: juego.id });
  };

  //const imagenUrl = juego.url_imagen || juego.portada;
  //const defaultImage = "https://placehold.co/600x400/1a1a1a/d4af37?text=NO+IMAGE";

  // Formateo simple del precio
  const precioTexto = juego.precio !== undefined ? `$${juego.precio.toLocaleString()}` : 'N/A';

  return (
    <TouchableOpacity style={globalStyles.verticalCard} onPress={handlePress}>
      <View style={globalStyles.verticalCardContainer}> 
       {/* <Image 
          source={{ uri: imagenUrl || defaultImage }} 
          style={globalStyles.verticalCardImage} 
        />*/}
        
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

