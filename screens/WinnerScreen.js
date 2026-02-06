import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function WinnerScreen({ route, navigation }) {
  const { homeTeam, awayTeam, homeScore, awayScore, playerStats } = route.params;

  // Animaciones
  const [mvpScale] = useState(new Animated.Value(0));
  const [mvpRotate] = useState(new Animated.Value(0));
  const [mvpGlow] = useState(new Animated.Value(0));
  const [fadeAnim2] = useState(new Animated.Value(0));
  const [fadeAnim3] = useState(new Animated.Value(0));
  const [fadeAnim4] = useState(new Animated.Value(0));
  const [fadeAnim5] = useState(new Animated.Value(0));

  // Lógica para determinar el ganador
  let winnerTeam = null;
  let isDraw = false;

  if (homeScore > awayScore) {
    winnerTeam = homeTeam;
  } else if (awayScore > homeScore) {
    winnerTeam = awayTeam;
  } else {
    isDraw = true;
  }

  // Calcular TOP 5 jugadores
  const topPlayers = playerStats
    .filter(player => player.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const mvpPlayer = topPlayers[0];
  const otherPlayers = topPlayers.slice(1);

  // Animación del MVP
  useEffect(() => {
    // Animación de entrada del MVP (escala + rotación)
    Animated.parallel([
      Animated.spring(mvpScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(mvpRotate, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de brillo pulsante continuo
    Animated.loop(
      Animated.sequence([
        Animated.timing(mvpGlow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(mvpGlow, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animación del resto de jugadores
    const animations = [fadeAnim2, fadeAnim3, fadeAnim4, fadeAnim5];
    animations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000 + index * 200);
    });
  }, []);

  const fadeAnims = [null, fadeAnim2, fadeAnim3, fadeAnim4, fadeAnim5];
  const medals = ['', '🥈', '🥉', '4️⃣', '5️⃣'];

  const mvpRotation = mvpRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '0deg'],
  });

  const mvpGlowOpacity = mvpGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>¡PARTIDO FINALIZADO!</Text>

          <View style={styles.finalScoreContainer}>
            <View style={styles.teamFinalScore}>
              <Image 
                source={homeTeam.logo}
                style={styles.smallLogo}
                resizeMode="contain"
              />
              <Text style={styles.teamName}>{homeTeam.shortName}</Text>
              <Text style={styles.finalScore}>{homeScore}</Text>
            </View>

            <Text style={styles.vs}>-</Text>

            <View style={styles.teamFinalScore}>
              <Image 
                source={awayTeam.logo}
                style={styles.smallLogo}
                resizeMode="contain"
              />
              <Text style={styles.teamName}>{awayTeam.shortName}</Text>
              <Text style={styles.finalScore}>{awayScore}</Text>
            </View>
          </View>

          {/* Mostrar ganador o empate */}
          {isDraw ? (
            <View style={styles.resultContainer}>
              <Text style={styles.drawTitle}>¡EMPATE!</Text>
              <View style={styles.drawLogos}>
                <Image 
                  source={homeTeam.logo}
                  style={styles.bigLogo}
                  resizeMode="contain"
                />
                <Image 
                  source={awayTeam.logo}
                  style={styles.bigLogo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.drawText}>Ambos equipos quedan empatados</Text>
            </View>
          ) : (
            <View style={styles.resultContainer}>
              <Text style={styles.winnerTitle}>🏆 GANADOR 🏆</Text>
              <Image 
                source={winnerTeam.logo}
                style={styles.winnerLogo}
                resizeMode="contain"
              />
              <Text style={[styles.winnerName, { color: winnerTeam.color }]}>
                {winnerTeam.name}
              </Text>
              <View style={[styles.winnerBadge, { backgroundColor: winnerTeam.color }]}>
                <Text style={styles.winnerBadgeText}>CAMPEÓN</Text>
              </View>
            </View>
          )}

          {/* TOP 5 ANOTADORES - TÍTULO PRINCIPAL */}
          {topPlayers.length > 0 && (
            <View style={styles.topScorersSection}>
              <Text style={styles.mainTitle}>🏀 TOP 5 ANOTADORES </Text>
              
              {/* MVP - JUGADOR #1 */}
              {mvpPlayer && (
                <View style={styles.mvpWrapper}>
                  <Text style={styles.mvpLabel}>👑 JUGADOR MVP 👑</Text>
                  
                  <Animated.View
                    style={[
                      styles.mvpHeroCard,
                      {
                        transform: [
                          { scale: mvpScale },
                          { rotate: mvpRotation },
                        ],
                      },
                    ]}
                  >
                    <Animated.View 
                      style={[
                        styles.mvpGlowEffect,
                        { opacity: mvpGlowOpacity }
                      ]}
                    />
                    
                    <View style={styles.mvpCrown}>
                      <Text style={styles.mvpCrownText}>👑</Text>
                    </View>

                    <Image 
                      source={mvpPlayer.teamLogo}
                      style={styles.mvpHeroLogo}
                      resizeMode="contain"
                    />

                    <Text style={styles.mvpHeroName}>{mvpPlayer.playerName}</Text>
                    <Text style={styles.mvpHeroTeam}>{mvpPlayer.teamName}</Text>

                    <View style={[styles.mvpHeroPointsBadge, { backgroundColor: mvpPlayer.teamColor }]}>
                      <Text style={styles.mvpHeroPoints}>{mvpPlayer.points}</Text>
                      <Text style={styles.mvpHeroPointsLabel}>PUNTOS</Text>
                    </View>

                    <View style={styles.mvpHeroMedal}>
                      <Text style={styles.mvpHeroMedalText}>🥇</Text>
                    </View>
                  </Animated.View>
                </View>
              )}

              {/* RESTO DE ANOTADORES (2-5) */}
              {otherPlayers.length > 0 && (
                <View style={styles.otherPlayersContainer}>
                  {otherPlayers.map((player, index) => {
                    const actualIndex = index + 1;
                    
                    return (
                      <Animated.View
                        key={player.playerId}
                        style={[
                          styles.scorerCard,
                          {
                            opacity: fadeAnims[actualIndex],
                            transform: [
                              {
                                translateY: fadeAnims[actualIndex]?.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [50, 0],
                                }) || 0,
                              },
                            ],
                          },
                        ]}
                      >
                        <View style={styles.scorerRank}>
                          <Text style={styles.scorerMedal}>{medals[actualIndex]}</Text>
                          <Text style={styles.scorerPosition}>#{actualIndex + 1}</Text>
                        </View>

                        <Image 
                          source={player.teamLogo}
                          style={styles.scorerTeamLogo}
                          resizeMode="contain"
                        />

                        <View style={styles.scorerInfo}>
                          <Text style={styles.scorerPlayerName}>{player.playerName}</Text>
                          <Text style={styles.scorerTeamName}>{player.teamName}</Text>
                        </View>

                        <View style={[styles.scorerPointsBadge, { backgroundColor: player.teamColor }]}>
                          <Text style={styles.scorerPoints}>{player.points}</Text>
                          <Text style={styles.scorerPointsLabel}>PTS</Text>
                        </View>
                      </Animated.View>
                    );
                  })}
                </View>
              )}
            </View>
          )}

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('TeamSelection')}
          >
            <Text style={styles.backButtonText}>🏠 VOLVER AL INICIO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0000AA',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginBottom: 20,
  },
  finalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a3e',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 20,
  },
  teamFinalScore: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  smallLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  finalScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  vs: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: '#1a1a3e',
    padding: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
    width: '100%',
    marginBottom: 20,
  },
  winnerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  winnerLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  winnerBadge: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  winnerBadgeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  drawTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  drawLogos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  bigLogo: {
    width: 100,
    height: 100,
  },
  drawText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  // SECCIÓN COMPLETA TOP 5 ANOTADORES
  topScorersSection: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#1a1a3e',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
    padding: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  
  // MVP WRAPPER
  mvpWrapper: {
    marginBottom: 20,
  },
  mvpLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  mvpHeroCard: {
    backgroundColor: '#2a2a5e',
    padding: 25,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#FFD700',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    position: 'relative',
    overflow: 'visible',
  },
  mvpGlowEffect: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    backgroundColor: '#FFD700',
    borderRadius: 25,
    zIndex: -1,
  },
  mvpCrown: {
    position: 'absolute',
    top: -30,
    zIndex: 10,
  },
  mvpCrownText: {
    fontSize: 50,
  },
  mvpHeroLogo: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 15,
  },
  mvpHeroName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  mvpHeroTeam: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 15,
  },
  mvpHeroPointsBadge: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 15,
  },
  mvpHeroPoints: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mvpHeroPointsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  mvpHeroMedal: {
    marginTop: 10,
  },
  mvpHeroMedalText: {
    fontSize: 60,
  },

  // RESTO DE JUGADORES (2-5)
  otherPlayersContainer: {
    marginTop: 10,
  },
  scorerCard: {
    flexDirection: 'row',
    backgroundColor: '#0f0f2e',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
  },
  scorerRank: {
    alignItems: 'center',
    marginRight: 12,
    width: 45,
  },
  scorerMedal: {
    fontSize: 28,
  },
  scorerPosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 2,
  },
  scorerTeamLogo: {
    width: 35,
    height: 35,
    marginRight: 12,
  },
  scorerInfo: {
    flex: 1,
  },
  scorerPlayerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scorerTeamName: {
    fontSize: 11,
    color: '#AAAAAA',
    marginTop: 2,
  },
  scorerPointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
  },
  scorerPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scorerPointsLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default WinnerScreen;