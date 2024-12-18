import { Character, CharacterLocation } from "../services/characters/characters.entity";

export const DOOMIE_CHARACTER: Character = {
  created: "",
  episode: [],
  gender: "",
  id: undefined,
  image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
  location: {
    name: "",
    url: ""
  },
  name: "",
  origin: {
    name: "",
    url: ""
  },
  species: "",
  status: "",
  type: "",
  url: "",
}

export function isCharacterLocation(value: any): value is CharacterLocation {
    return (
      typeof value === "object" &&
      value !== null &&
      typeof value.name === "string" &&
      typeof value.url === "string"
    );
}
  