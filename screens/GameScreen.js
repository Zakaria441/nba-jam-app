import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function GameScreen({ route, navigation }) {
  const { homeTeam, awayTeam } = route.params;
  
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [time, setTime] = useState('12:00');

  const addPoints = (team, points) => {
    if (team === 'home') {
      setHomeScore(homeScore + points);
    } else {
      setAwayScore(awayScore + points);
    }
  };

  const resetGame = () => {
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(1);
    setTime('12:00');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.scoreboard}>
          <Text style={styles.gameTitle}>NBA JAM</Text>
          
          <View style={styles.scoreContainer}>
            <View style={[styles.teamScore, { backgroundColor: homeTeam.color }]}>
              <Image 
                source={homeTeam.logo}
                style={styles.teamLogo}
                resizeMode="contain"
              />
              <Text style={styles.teamScoreName}>{homeTeam.shortName}</Text>
              <Text style={styles.score}>{homeScore}</Text>
            </View>

            <View style={styles.gameInfo}>
              <Text style={styles.quarter}>Q{quarter}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>

            <View style={[styles.teamScore, { backgroundColor: awayTeam.color }]}>
              <Image 
                source={awayTeam.logo}
                style={styles.teamLogo}
                resizeMode="contain"
              />
              <Text style={styles.teamScoreName}>{awayTeam.shortName}</Text>
              <Text style={styles.score}>{awayScore}</Text>
            </View>
          </View>
        </View>

        <View style={styles.court}>
          <Text style={styles.courtText}>🏀</Text>
          <Text style={styles.courtLabel}>CANCHA</Text>
        </View>

        <View style={styles.controls}>
          <Text style={styles.controlsTitle}>CONTROLES</Text>
          
          <View style={styles.buttonRow}>
            <View style={styles.teamControls}>
              <Text style={[styles.controlLabel, { color: homeTeam.color }]}>
                {homeTeam.shortName}
              </Text>
              <TouchableOpacity 
                style={[styles.pointButton, { backgroundColor: homeTeam.color }]}
                onPress={() => addPoints('home', 2)}
              >
                <Text style={styles.pointText}>+2</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pointButton, { backgroundColor: homeTeam.color }]}
                onPress={() => addPoints('home', 3)}
              >
                <Text style={styles.pointText}>+3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.teamControls}>
              <Text style={[styles.controlLabel, { color: awayTeam.color }]}>
                {awayTeam.shortName}
              </Text>
              <TouchableOpacity 
                style={[styles.pointButton, { backgroundColor: awayTeam.color }]}
                onPress={() => addPoints('away', 2)}
              >
                <Text style={styles.pointText}>+2</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pointButton, { backgroundColor: awayTeam.color }]}
                onPress={() => addPoints('away', 3)}
              >
                <Text style={styles.pointText}>+3</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.resetButton]}
              onPress={resetGame}
            >
              <Text style={styles.actionButtonText}>🔄 REINICIAR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.backButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.actionButtonText}>⬅️ VOLVER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scoreboard: {
    backgroundColor: '#0000AA',
    padding: 15,
    borderBottomWidth: 4,
    borderBottomColor: '#FFD700',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamScore: {
    width: 110,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  teamLogo: {
    width: 40,
    height: 40,
  },
  teamScoreName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  gameInfo: {
    alignItems: 'center',
  },
  quarter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  court: {
    flex: 1,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  courtText: {
    fontSize: 60,
    marginBottom: 10,
  },
  courtLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  controls: {
    backgroundColor: '#1a1a3e',
    padding: 15,
    borderTopWidth: 4,
    borderTopColor: '#FFD700',
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  teamControls: {
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pointButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  pointText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  resetButton: {
    backgroundColor: '#FF6600',
  },
  backButton: {
    backgroundColor: '#0000AA',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default GameScreen;