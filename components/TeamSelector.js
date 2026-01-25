import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function TeamSelector({ team, onNext, label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity 
        style={[styles.teamBox, { borderColor: team.color }]}
        onPress={onNext}
      >
        <Image 
          source={team.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.teamName}>{team.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.changeButton, { backgroundColor: team.color }]}
        onPress={onNext}
      >
        <Text style={styles.buttonText}>CAMBIAR ▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  teamBox: {
    width: 280,
    height: 100,
    backgroundColor: '#0000AA',
    borderWidth: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  changeButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TeamSelector;