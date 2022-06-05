//PROPS:
export interface MoveGroupProps {
  moves: Move[];
  headline: string;
  isLvlGroup?: boolean;
}
export interface EvolutionChainProps {
  evoUrl: string;
}
export interface SinglePokemonAbilitiesProps {
  abilities: { ability: { url: string }; is_hidden: boolean }[];
}
export interface SinglePokemonHeaderProps {
  url: string;
  id: number;
  name: string;
}
export interface SinglePokemonMovesProps {
  moves: Move[];
}

export interface SinglePokemonSpeciesProps {
  url: string;
  baseExp: number;
  heldItems: string[];
}
export interface SinglePokemonStatsProps {
  stats: { base_stat: number; stat: { name: string } }[];
}
export interface SinglePokemonTypesProps {
  types: string[];
}
export interface SingularAbilityProps {
  url: string;
  isHidden: boolean;
}
export interface SingularMoveProps {
  move?: Move;
  isLvlUp?: boolean;
}
export interface SingularMoveDetailsProps {
  data: {
    damage_class: { name: string };
    meta: {
      max_hits: number;
      min_hits: number;
      max_turns: number;
      min_turns: number;
      ailment: { name: string };
      ailment_chance: number;
      crit_rate: number;
      flinch_chance: number;
      drain: number;
      healing: number;
    };
    type: { name: string };
    accuracy: number;
    effect_entries: { effect: string }[];
    target: { name: string };
    power: number;
    pp: number;
    priority: number;
    stat_changes: { change: number; stat: { name: string } }[];
    effect_chance: number;
  };
}
//OTHERS:

export interface EvolutionDetails {
  min_level: number;
  min_happiness: number;
  item?: { name: string };
  held_item?: { name: string };
  trigger: { name: string };
}
export interface ChainLink {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
  is_baby: boolean;
  evolution_details: EvolutionDetails[];
}
export interface EvolutionStage {
  chainLink: ChainLink;
  stage: string;
}

export interface Move {
  move: { name: string; url: string };
  version_group_details: VersionGroupDetail[];
}
export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: { name: string };
  version_group: { name: string };
}
