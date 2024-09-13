import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query, searchType } = useLocalSearchParams();  // Get query and searchType from the route
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);  // Reset error state before fetching

      // Replace spaces with hyphens for abilities to match the format of the API
      const formattedQuery = searchType === 'ability' ? query.replace(/\s+/g, '-').toLowerCase() : query.toLowerCase();

      try {
        let api;
        if (searchType === 'name') {
          api = `https://pokeapi.co/api/v2/pokemon/${formattedQuery}`;
        } else if (searchType === 'ability') {
          api = `https://pokeapi.co/api/v2/ability/${formattedQuery}`;
        } else if (searchType === 'type') {
          api = `https://pokeapi.co/api/v2/type/${formattedQuery}`;
        }

        const response = await fetch(api);
        const result = await response.json();

        if (!result || (searchType !== 'name' && !result.pokemon)) {
          setIsError(true);  // If the result doesn't contain expected data, set error
        } else {
          setData(result);  // Store the fetched data in state
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
      }
    };

    if (query) {
      fetchData();  // Trigger API call when query is available
    }
  }, [query, searchType]);  // Re-run the effect if query or searchType changes

  // Grid view for Type & Ability search returns
  const renderPokemonGrid = (pokemonList) => {
    if (!pokemonList || pokemonList.length === 0) {
      return <Text style={styles.errorText}>No Pokémon found.</Text>;
    }

    return (
      <FlatList
        data={pokemonList}
        numColumns={3}  // Grid with 3 columns
        keyExtractor={(item) => item.pokemon.name}
        renderItem={({ item }) => {
          const pokemonName = item.pokemon.name;
          const pokemonUrl = item.pokemon.url;

          // Extract Pokémon ID from URL to fetch the sprite
          const pokemonId = pokemonUrl.split('/')[pokemonUrl.split('/').length - 2];
          const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <View style={styles.pokemonContainer}>
              <Image
                source={{ uri: pokemonImageUrl }}
                style={styles.pokemonImage}
                resizeMode="contain"
              />
              <Text style={styles.pokemonName}>{pokemonName}</Text>
            </View>
          );
        }}
      />
    );
  };

return (
  <View style={styles.container}>
    <Text style={styles.heading}>
      {searchType.charAt(0).toUpperCase() + searchType.slice(1)}: {query}
    </Text>

    {/* Handle different search types */}
    {isError ? (
      <Text style={styles.errorText}>No results found. Please check your query and try again.</Text>
    ) : data && (
      <View>
        {/* If searching by name, show the Pokemon's sprite */}
        {searchType === 'name' && data.sprites && (
          <View style={styles.centered}>
            <Image
              source={{ uri: data.sprites.front_default }}
              style={styles.pokemonImageLarge}
              resizeMode="contain"
              testID="pokemon-sprite"  // Add testID for testing
            />
          </View>
        )}

        {/* If searching by ability or type, show a grid of Pokemon */}
        {searchType === 'ability' && data.pokemon && renderPokemonGrid(data.pokemon)}
        {searchType === 'type' && data.pokemon && renderPokemonGrid(data.pokemon)}
      </View>
    )}
  </View>
);
};

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
    marginBottom: 10,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pokemonContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonImageLarge: {
    width: 200,
    height: 200,
  },
  pokemonName: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Search;
