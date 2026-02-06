import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function GameScreen({ route, navigation }) {
  const { homeTeam, awayTeam } = route.params;
  
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  
  // Estado para rastrear puntos por jugador
  const [playerPoints, setPlayerPoints] = useState({});

  // Función para añadir puntos a un jugador específico
  const addPlayerPoints = (playerId, playerName, teamName, teamColor, teamLogo, teamType, points) => {
    // Actualizar puntos del jugador
    setPlayerPoints(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + points
    }));

    // Actualizar marcador del equipo
    if (teamType === 'home') {
      setHomeScore(homeScore + points);
    } else {
      setAwayScore(awayScore + points);
    }
  };

  // Función para finalizar el juego
  const endGame = () => {
    // Preparar estadísticas de todos los jugadores
    const allPlayers = [
      ...homeTeam.players.map(p => ({
        playerId: `home-${p.id}`,
        playerName: p.name,
        teamName: homeTeam.shortName,
        teamColor: homeTeam.color,
        teamLogo: homeTeam.logo,
        points: playerPoints[`home-${p.id}`] || 0
      })),
      ...awayTeam.players.map(p => ({
        playerId: `away-${p.id}`,
        playerName: p.name,
        teamName: awayTeam.shortName,
        teamColor: awayTeam.color,
        teamLogo: awayTeam.logo,
        points: playerPoints[`away-${p.id}`] || 0
      }))
    ];

    navigation.navigate('Winner', {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      homeScore: homeScore,
      awayScore: awayScore,
      playerStats: allPlayers,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Marcador */}
        <View style={styles.scoreboard}>
          <Text style={styles.gameTitle}>NBA JAM - EN JUEGO</Text>
          
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

            <Text style={styles.vs}>VS</Text>

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

        {/* Plantillas de jugadores */}
        <ScrollView style={styles.playersContainer}>
          <View style={styles.teamsRow}>
            {/* Equipo Local */}
            <View style={styles.teamColumn}>
              <Text style={[styles.teamHeader, { color: homeTeam.color }]}>
                {homeTeam.shortName.toUpperCase()}
              </Text>
              {homeTeam.players.map((player) => {
                const playerId = `home-${player.id}`;
                const points = playerPoints[playerId] || 0;
                
                return (
                  <View key={player.id} style={styles.playerRow}>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerNumber}>#{player.number}</Text>
                      <Text style={styles.playerName}>{player.name}</Text>
                      {points > 0 && (
                        <Text style={styles.playerPoints}>🏀 {points} pts</Text>
                      )}
                    </View>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity 
                        style={[styles.pointButton, { backgroundColor: homeTeam.color }]}
                        onPress={() => addPlayerPoints(
                          playerId,
                          player.name,
                          homeTeam.shortName,
                          homeTeam.color,
                          homeTeam.logo,
                          'home',
                          2
                        )}
                      >
                        <Text style={styles.pointButtonText}>+2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.pointButton, { backgroundColor: homeTeam.color }]}
                        onPress={() => addPlayerPoints(
                          playerId,
                          player.name,
                          homeTeam.shortName,
                          homeTeam.color,
                          homeTeam.logo,
                          'home',
                          3
                        )}
                      >
                        <Text style={styles.pointButtonText}>+3</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Equipo Visitante */}
            <View style={styles.teamColumn}>
              <Text style={[styles.teamHeader, { color: awayTeam.color }]}>
                {awayTeam.shortName.toUpperCase()}
              </Text>
              {awayTeam.players.map((player) => {
                const playerId = `away-${player.id}`;
                const points = playerPoints[playerId] || 0;
                
                return (
                  <View key={player.id} style={styles.playerRow}>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerNumber}>#{player.number}</Text>
                      <Text style={styles.playerName}>{player.name}</Text>
                      {points > 0 && (
                        <Text style={styles.playerPoints}>🏀 {points} pts</Text>
                      )}
                    </View>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity 
                        style={[styles.pointButton, { backgroundColor: awayTeam.color }]}
                        onPress={() => addPlayerPoints(
                          playerId,
                          player.name,
                          awayTeam.shortName,
                          awayTeam.color,
                          awayTeam.logo,
                          'away',
                          2
                        )}
                      >
                        <Text style={styles.pointButtonText}>+2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.pointButton, { backgroundColor: awayTeam.color }]}
                        onPress={() => addPlayerPoints(
                          playerId,
                          player.name,
                          awayTeam.shortName,
                          awayTeam.color,
                          awayTeam.logo,
                          'away',
                          3
                        )}
                      >
                        <Text style={styles.pointButtonText}>+3</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.endButton]}
            onPress={endGame}
          >
            <Text style={styles.actionButtonText}>🏁 FIN DEL JUEGO</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>⬅️ VOLVER</Text>
          </TouchableOpacity>
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
  },
  scoreboard: {
    backgroundColor: '#0000AA',
    padding: 15,
    borderBottomWidth: 4,
    borderBottomColor: '#FFD700',
  },
  gameTitle: {
    fontSize: 20,
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
  vs: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  playersContainer: {
    flex: 1,
    backgroundColor: '#1a1a3e',
  },
  teamsRow: {
    flexDirection: 'row',
    padding: 10,
  },
  teamColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  teamHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#0000AA',
    borderRadius: 5,
  },
  playerRow: {
    backgroundColor: '#2a2a4e',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playerInfo: {
    marginBottom: 8,
  },
  playerNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  playerName: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  playerPoints: {
    fontSize: 10,
    color: '#00FF00',
    fontWeight: 'bold',
    marginTop: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
  },
  pointButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#0000AA',
    borderTopWidth: 4,
    borderTopColor: '#FFD700',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  endButton: {
    backgroundColor: '#00AA00',
  },
  backButton: {
    backgroundColor: '#FF0000',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default GameScreen;