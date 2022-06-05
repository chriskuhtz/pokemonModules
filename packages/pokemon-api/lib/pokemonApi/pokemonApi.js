// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
            query: function () { return "pokemon?limit=984"; },
        }),
        getAbilityByIndex: builder.query({
            query: function (index) { return "ability/".concat(index); },
        }),
        getMoveByIndex: builder.query({
            query: function (index) { return "move/".concat(index); },
        }),
        getSpeciesByIndex: builder.query({
            query: function (index) { return "pokemon-species/".concat(index); },
        }),
        getEvolutionChainByIndex: builder.query({
            query: function (index) { return "evolution-chain/".concat(index); },
        }),
    }); },
});
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export var useGetPokemonByNameQuery = pokemonApi.useGetPokemonByNameQuery, useGetGenOnePokemonQuery = pokemonApi.useGetGenOnePokemonQuery, useGetGenTwoPokemonQuery = pokemonApi.useGetGenTwoPokemonQuery, useGetAllPokemonQuery = pokemonApi.useGetAllPokemonQuery, useGetAbilityByIndexQuery = pokemonApi.useGetAbilityByIndexQuery, useGetMoveByIndexQuery = pokemonApi.useGetMoveByIndexQuery, useLazyGetMoveByIndexQuery = pokemonApi.useLazyGetMoveByIndexQuery, useGetSpeciesByIndexQuery = pokemonApi.useGetSpeciesByIndexQuery, useGetEvolutionChainByIndexQuery = pokemonApi.useGetEvolutionChainByIndexQuery, useLazyGetEvolutionChainByIndexQuery = pokemonApi.useLazyGetEvolutionChainByIndexQuery;
//# sourceMappingURL=pokemonApi.js.map