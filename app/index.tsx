import React, { useState, useRef, useEffect } from 'react';
import GamesList  from '@/components/games';
import { View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const platforms = ['PC', 'Browser'];

const App = () => {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: expanded ? 90 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [expanded, heightAnim]);

  const handlePress = (item: string) => {
    setFilter(prevFilter => prevFilter === item ? '' : item);
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.header}>Free Games</Text>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <FontAwesome6 name="filter" size={30} style={{ color: 'white' }} />
       </TouchableOpacity>
       </View>
       <Animated.View style={{ height: heightAnim }}>
        {platforms.map((item) => (
          <TouchableOpacity key={item} onPress={() => handlePress(item.toLowerCase())}>
            <Text style={{ fontSize: 20, color: 'white', padding: 4 }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <GamesList filter={filter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33658A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    
  },
});


export default App;