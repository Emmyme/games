import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';


interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  release_date: string;
}

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
  const [expanded, setExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, heightAnim]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);


  return (
  <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
    <Image
    style={{ borderRadius: 10 }}
     source={{
      uri: game.thumbnail,
      width: 200,
      height: 100,
    }} />
    <Text style={styles.title}>{game.title}</Text>
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <Text style={{ fontSize: 16 }}>Read more</Text>
    </TouchableOpacity>
      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        <Text style={styles.description}>{game.short_description}</Text>
      </Animated.View>
   
  </Animated.View>)
};

interface GamesListProps {
  filter: string;
}  

const GamesList: React.FC<GamesListProps> = ({ filter })  => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(`https://www.freetogame.com/api/games${filter ? `?platform=${filter}` : ''}`)
      .then(response => response.json())
      .then((data: Game[]) => setGames(data))
      .catch(error => console.error('Error fetching games:', error));
  }, [filter]);

  return (
    <FlatList
      data={games}
      renderItem={({ item }) => <GameItem game={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 500,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  }
});

export default GamesList;

