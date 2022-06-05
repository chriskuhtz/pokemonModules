// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { extractUrlIndex } from "./Helpers/extractUrlIndex";
// Define a service using a base URL and expected endpoints
export var pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: function (builder) { return ({
        getPokemonByName: builder.query({
            query: function (name) { return "pokemon/".concat(name); },
        }),
        getGenOnePokemon: builder.query({
            query: function () { return "pokemon?limit=151"; },
        }),
        getGenTwoPokemon: builder.query({
            query: function () { return "pokemon?limit=252&offset=151"; },
        }),
        getAllPokemon: builder.query({
            query: function () { return "pokemon?limit=1126"; },
        }),
        getAbilityByUrl: builder.query({
            query: function (url) { return "ability/".concat(extractUrlIndex(url)); },
        }),
        getMoveByUrl: builder.query({
            query: function (url) { return "move/".concat(extractUrlIndex(url)); },
        }),
        getSpeciesByUrl: builder.query({
            query: function (url) { return "pokemon-species/".concat(extractUrlIndex(url)); },
        }),
        getEvolutionChainByUrl: builder.query({
            query: function (url) { return "evolution-chain/".concat(extractUrlIndex(url)); },
        }),
    }); },
});
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export var useGetPokemonByNameQuery = pokemonApi.useGetPokemonByNameQuery, useGetGenOnePokemonQuery = pokemonApi.useGetGenOnePokemonQuery, useGetGenTwoPokemonQuery = pokemonApi.useGetGenTwoPokemonQuery, useGetAllPokemonQuery = pokemonApi.useGetAllPokemonQuery, useGetAbilityByUrlQuery = pokemonApi.useGetAbilityByUrlQuery, useLazyGetAbilityByUrlQuery = pokemonApi.useLazyGetAbilityByUrlQuery, useLazyGetAllPokemonQuery = pokemonApi.useLazyGetAllPokemonQuery, useLazyGetGenOnePokemonQuery = pokemonApi.useLazyGetGenOnePokemonQuery, useLazyGetGenTwoPokemonQuery = pokemonApi.useLazyGetGenTwoPokemonQuery, useLazyGetPokemonByNameQuery = pokemonApi.useLazyGetPokemonByNameQuery, useGetEvolutionChainByUrlQuery = pokemonApi.useGetEvolutionChainByUrlQuery, useGetMoveByUrlQuery = pokemonApi.useGetMoveByUrlQuery, useGetSpeciesByUrlQuery = pokemonApi.useGetSpeciesByUrlQuery, useLazyGetEvolutionChainByUrlQuery = pokemonApi.useLazyGetEvolutionChainByUrlQuery, useLazyGetMoveByUrlQuery = pokemonApi.useLazyGetMoveByUrlQuery;
//# sourceMappingURL=pokemonApi.js.map