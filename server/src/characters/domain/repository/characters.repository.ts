import { ApiResponse } from 'src/utils/entities/api.entity';
import { Character } from '../entities/character.entity';

export interface CharacterRepository {
  getAll(
    limit: number,
    page: number,
    name?: string,
    status?: string,
    type?: string,
    species?: string,
    gender?: string,
  ): Promise<ApiResponse<Character>>;
  get(id: string): Promise<Array<Character>>;
  create(character: Character): Promise<void>;
  update(character: Character): Promise<void>;
  delete(id: string);
  migrateApiData(): Promise<void>;
}
