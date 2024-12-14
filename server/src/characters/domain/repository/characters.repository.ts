import { Character } from '../entities/character.entity';

export interface CharacterRepository {
  getAll(): Promise<Array<Character>>;
  get(id: string): Promise<Character>;
  create(character: Character): Promise<void>;
  update(character: Character): Promise<void>;
  delete(id: string);
}
