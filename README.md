# pokemonModules

To showcase and improve my skills as an advanced frontend developer, i want to create one large continuous project, instead of multiple small ones.

Pokemon is perfect for this, because of the topics extensive data and possible functionalities. For example remaking the battle system using frontend state handling).

I classify the modules in the monorepo as "standalone" or "assistance". "Assistance" Modules, like my API Handler for https://pokeapi.co/ , cannot be deployed and only provide functionality to other modules. 

"Standalone" Modules can consume assistance modules and can also be deployed. 

It is also possible to import "Standalone" Modules into other "Standalone" Modules, to create larger applications.

For example, the pokedex module will be integrated into any future module in which the user might need information about a Pokemon.

## Monorepo Standalone Modules:

### Blog and Documentation
https://pokemonmodules-blog.netlify.app/

### Pokedex using pokeApi.co and Redux Toolkit Query
https://pokemonmodules-pokedex.netlify.app/

## Legacy Modules:
These are older Projects that will soon be refactored and integrated into the monorepo.

### Map Maker
https://pokemonmodules-mapmaker.netlify.app/

github: https://github.com/chriskuhtz/pokemonMapMaker

### Battle System
https://pokemonmodules-battlesystem.netlify.app/

github: https://github.com/chriskuhtz/pokemonBattle


