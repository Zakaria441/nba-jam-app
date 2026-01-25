import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TeamSelector from '../components/TeamSelector';
import PlayerList from '../components/PlayerList';
import { teams } from '../data/teams';

function TeamSelectionScreen({ navigation }) {
  const [homeTeamIndex, setHomeTeamIndex] = useState(0);
  const [awayTeamIndex, setAwayTeamIndex] = useState(1);

  const homeTeam = teams[homeTeamIndex];
  const awayTeam = teams[awayTeamIndex];

  const nextHomeTeam = () => {
    setHomeTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
  };

  const nextAwayTeam = () => {
    setAwayTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
  };

  const startGame = () => {
    navigation.navigate('Game', {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>NBA JAM</Text>
          <Text style={styles.subtitle}>SELECCIÓN DE EQUIPOS</Text>

          <View style={styles.teamsContainer}>
            <View style={styles.teamSection}>
              <TeamSelector 
                team={homeTeam}
                onNext={nextHomeTeam}
                label="PLAYER 1 - HOME"
              />
              <PlayerList 
                players={homeTeam.players}
                teamColor={homeTeam.color}
              />
            </View>

            <Text style={styles.vs}>VS</Text>

            <View style={styles.teamSection}>
              <TeamSelector 
                team={awayTeam}
                onNext={nextAwayTeam}
                label="PLAYER 2 - VISITOR"
              />
              <PlayerList 
                players={awayTeam.players}
                teamColor={awayTeam.color}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.startButton}
            onPress={startGame}
          >
            <Text style={styles.startButtonText}>🏀 COMENZAR PARTIDO 🏀</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0000AA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  teamsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  teamSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  vs: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
    marginVertical: 15,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  startButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  hint: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default TeamSelectionScreen;