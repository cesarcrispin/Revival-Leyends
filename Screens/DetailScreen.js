// Screens/DetailScreen.js (MODIFICADO para Modal/Bottom Sheet)
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getJuegoDetalles } from '../context/JuegosContext'; 
// Importamos useRoute para params y useNavigation para cerrar
import { useRoute, useNavigation } from '@react-navigation/native'; 

const { height } = Dimensions.get('window'); // Obtener altura de la pantalla

export default function DetailScreen() {
  const route = useRoute();
  const navigation = useNavigation(); // Hook para navegar/cerrar
  const { juegoId } = route.params; 
  
  const [juegoDetalle, setJuegoDetalle] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Lógica de carga de detalles (MISMA QUE ANTES)
  useEffect(() => {
    const cargarDetalles = async () => {
 
      try {
        setCargando(true);
        const detalles = await getJuegoDetalles(juegoId);
        setJuegoDetalle(detalles);
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };
    cargarDetalles();
  }, [juegoId]);

  //Funciones de Botones
  const handleCerrar = () => {
    //Cierra el modal (vuelve a la pantalla anterior)
    navigation.goBack(); 
  };
  
  const handleAnadirCarrito = () => {

    alert(` añadido al carrito`);

  };

  if (cargando) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }
  
  if (error || !juegoDetalle) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error al cargar.</Text>
        <TouchableOpacity onPress={handleCerrar} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //Renderizado del Modal de Detalles
  return (
    
    <View style={styles.modalContainer}>
      
      {/* Botón de Cerrar (X) en la esquina superior */}
      <TouchableOpacity onPress={handleCerrar} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Imagen de Portada */}
        <Image source={{ uri: juegoDetalle.url_imagen }} style={styles.image} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{juegoDetalle.nombre}</Text>
          <Text style={styles.price}>
            ${juegoDetalle.precio.toLocaleString('es-CO')} COP
          </Text>
          
          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Detalles</Text>
          <Text style={styles.detailText}>Categoría: {juegoDetalle.categoria}</Text>
          <Text style={styles.detailText}>Desarrolladora: {juegoDetalle.desarrolladora}</Text>
          <Text style={styles.detailText}>Calificación: {juegoDetalle.calificacion} ⭐</Text>
          
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Descripción</Text>
          <Text style={styles.descriptionText}>{juegoDetalle.descripcion}</Text>
        </View>
      </ScrollView>

      {/* Botón de Carrito (fijo en la parte inferior) */}
      <TouchableOpacity onPress={handleAnadirCarrito} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Añadir a Carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos específicos para la vista parcial (Modal/Bottom Sheet)
const styles = StyleSheet.create({
  loading: { 
    flex: 1, 
    backgroundColor: '#121212)', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20
  },
  modalContainer: {
    // Hace que la vista ocupe 80% de la altura de la pantalla
    height: height * 0.85, 
    marginTop: height * 0.15, // Empuja hacia abajo para dejar ver el fondo
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden', // Necesario para que el radio no se corte
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e1d9d9ff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#e1d9d9ff',
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4CAF50', // Verde para el precio
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e1d9d9ff',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#e1d9d9ff',
    lineHeight: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#e1d9d9ff',
    lineHeight: 24,
  },
  addToCartButton: {
    backgroundColor: '#007AFF', // Azul primario
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});