

# pokemonModules

## Next Release: 
Battle System: Redux Store Bugfix (status conditions are not updated before second move is calculated, e.g. Pokemon is frozen, but can still execute its move if it goes second)

## 06.07.2022:  
Bug Button: allows test users to create Github Issues without leaving the site

## 05.07.2022:  
Battle System: Preview for TeamBox, Item Menu

## 03.07.2022:  
Battle System: Background, Sprite Positioning

## 02.07.2022:  
Battle System: Status Condition Freeze
Battle System: Status Condition Sleep

## 25.06.2022: 
Battle System: picking random moves the pokemon can learn, instead of first four

Battle System: let opponent AI pick random move



## Overview:

To showcase and improve my skills as an advanced frontend developer, i want to create one large continuous project, instead of multiple small ones.

Pokemon is perfect for this, because of the topics extensive data and possible functionalities. For example remaking the battle system using frontend state handling).

"Standalone" Modules can consume support modules and can also be deployed. 

It is also possible to import "Standalone" Modules into other "Standalone" Modules, to create larger applications.

For example, the pokedex module will be integrated into any future module in which the user might need information about a Pokemon.

![](monorepo.drawio.png)

## Standalone Modules:

### Pokedex
https://pokemonmodules-pokedex.netlify.app/

### Battle System (designed for sideways smartphone, responsive for Desktop, but not too pretty)
https://pokemonmodules-battlesystem.netlify.app/

### Color Theme Generator
https://pokemonmodules-theme-generator.netlify.app/

### Blog and Documentation
https://pokemonmodules-blog.netlify.app/





## Legacy Modules:
These are older Projects that will soon be refactored and integrated into the monorepo.

### Map Maker
https://pokemonmodules-mapmaker.netlify.app/

github: https://github.com/chriskuhtz/pokemonMapMaker



