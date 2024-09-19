import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getPokemonListByUserId, getPokemonById } from '../pokemonDAO';
import { useLocalSearchParams } from 'expo-router';

/**
 * The Favorites page displays images of the user's favorited pokemon
 */
const Bookmark = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Get the list of pokemon ids associated with the user ID
        const pokemonIds = await getPokemonListByUserId(parsedUser.id);

        // Fetch the details for each ID
        const pokemonDetailsPromises = pokemonIds.map(async (pokemonID) => {
          const pokemon = await getPokemonById(pokemonID);
          return pokemon;
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);

        // Update state with the pokemon details
        setPokemonList(pokemonDetails.filter(pokemon => pokemon !== null));
      } catch (error) {
        console.log('Error fetching Pokémon:', error);
      }
    };

    if (parsedUser && parsedUser.id) {
      fetchPokemon();
    }
  }, []);

  // Grid for rendering
  const renderPokemonItem = ({ item }) => {
    return (
      <View style={styles.pokemonContainer}>
        <Image
          source={{ uri: item.picture }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
        <Text style={styles.pokemonName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {parsedUser && (
        <Text style={styles.heading}>Hello, {parsedUser.username}</Text>
      )}
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.pokemonID.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  heading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 10,
  },
  grid: {
    alignItems: 'center',
  },
  pokemonContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 50,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonName: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
});
