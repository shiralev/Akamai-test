export const API_PREFIX = 'https://pokeapi.co/api/v2';
export const POKEMON_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pokémon_logo.svg';

export interface IApiRespons {
    count: number;
    next: string;
    previous: string;
    results: IPokemon[];
};

export interface IPokemon {
    name: string;
    url: string;
    id?: string;
};