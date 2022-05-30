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
        getAllPokemon: builder.query({
            query: function () { return "pokemon?limit=151"; },
        }),
    }); },
});
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export var useGetPokemonByNameQuery = pokemonApi.useGetPokemonByNameQuery, useGetAllPokemonQuery = pokemonApi.useGetAllPokemonQuery;
//# sourceMappingURL=pokemonApi.js.map