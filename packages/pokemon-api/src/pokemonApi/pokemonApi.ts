// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { extractUrlIndex } from "./Helpers/extractUrlIndex";

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
      query: () => `pokemon?limit=1126`,
    }),
    getAbilityByUrl: builder.query({
      query: (url: string) => `ability/${extractUrlIndex(url)}`,
    }),
    getMoveByUrl: builder.query({
      query: (url: string) => `move/${extractUrlIndex(url)}`,
    }),
    getSpeciesByUrl: builder.query({
      query: (url: string) => `pokemon-species/${extractUrlIndex(url)}`,
    }),
    getEvolutionChainByUrl: builder.query({
      query: (url: string) => `evolution-chain/${extractUrlIndex(url)}`,
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
  useGetAbilityByUrlQuery,
  useLazyGetAbilityByUrlQuery,
  useLazyGetAllPokemonQuery,
  useLazyGetGenOnePokemonQuery,
  useLazyGetGenTwoPokemonQuery,
  useLazyGetPokemonByNameQuery,
  useGetEvolutionChainByUrlQuery,
  useGetMoveByUrlQuery,
  useGetSpeciesByUrlQuery,
  useLazyGetEvolutionChainByUrlQuery,
  useLazyGetMoveByUrlQuery,
} = pokemonApi;
