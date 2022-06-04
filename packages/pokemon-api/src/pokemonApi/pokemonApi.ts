// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getGenOnePokemon: builder.query({
      query: () => `pokemon?limit=151`,
    }),
    getGenTwoPokemon: builder.query({
      query: () => `pokemon?limit=252&offset=151`,
    }),
    getAllPokemon: builder.query({
      query: () => `pokemon?limit=984`,
    }),
    getAbilityByIndex: builder.query({
      query: (index: number) => `ability/${index}`,
    }),
    getMoveByIndex: builder.query({
      query: (index: number) => `move/${index}`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetGenOnePokemonQuery,
  useGetGenTwoPokemonQuery,
  useGetAllPokemonQuery,
  useGetAbilityByIndexQuery,
  useGetMoveByIndexQuery,
} = pokemonApi;
