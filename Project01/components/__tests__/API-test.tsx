import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import Search from '../../app/search/[query]';  // Adjust path to your component
import fetchMock from 'jest-fetch-mock';
import { useLocalSearchParams } from 'expo-router';

// Mock the `useLocalSearchParams` hook to return different query and searchType
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

// Test setup
beforeEach(() => {
  fetchMock.resetMocks();  // Reset the mocked fetch before each test
});

describe('Search Component Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('displays the correct sprite for ditto', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
      }
    }));

    useLocalSearchParams.mockReturnValue({
      query: 'ditto',
      searchType: 'name',
    });

    const { getByTestId } = render(<Search />);

    await waitFor(() => {
      const image = getByTestId('pokemon-sprite');
      expect(image.props.source.uri).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");
    });
  });

  it('displays the correct grid for ability "air lock"', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      pokemon: [
        {
          pokemon: {
            name: "rayquaza",
            url: "https://pokeapi.co/api/v2/pokemon/384/"
          }
        }
      ]
    }));

    useLocalSearchParams.mockReturnValue({
      query: 'air lock',
      searchType: 'ability',
    });

    const { getByText } = render(<Search />);

    await waitFor(() => {
      expect(getByText('rayquaza')).toBeTruthy();
    });
  });

  it('displays the correct grid for type "fire"', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      pokemon: [
        {
          pokemon: {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/4/"
          }
        }
      ]
    }));

    useLocalSearchParams.mockReturnValue({
      query: 'fire',
      searchType: 'type',
    });

    const { getByText } = render(<Search />);

    await waitFor(() => {
      expect(getByText('charmander')).toBeTruthy();
    });
  });
});
