import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

function PlayerList({ players, teamColor }) {
  const renderPlayer = ({ item }) => (
    <View style={[styles.playerItem, { borderLeftColor: teamColor }]}>
      <Text style={styles.playerNumber}>#{item.number}</Text>
      <Text style={styles.playerName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ROSTER</Text>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#1a1a3e',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  playerItem: {
    flexDirection: 'row',
    backgroundColor: '#0000AA',
    padding: 8,
    marginBottom: 5,
    borderRadius: 4,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  playerNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 10,
    width: 35,
  },
  playerName: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
});

export default PlayerList;