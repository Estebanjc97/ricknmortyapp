import { Injectable } from '@nestjs/common';
import { Character } from 'src/characters/domain/entities/character.entity';
import { CharacterRepository } from 'src/characters/domain/repository/characters.repository';
import { RickAndMortyService } from 'src/services/rickAndMorty/rickAndMorty.service';
import { ApiResponse } from 'src/utils/entities/api.entity';

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
  constructor(private readonly rickAndMortyService: RickAndMortyService) {}

  getAll(
    page?: number,
    name?: string,
    status?: string,
    type?: string,
    species?: string,
    gender?: string,
  ): Promise<ApiResponse<Character>> {
    return this.rickAndMortyService.getAllCharacters(
      page,
      name,
      status,
      type,
      species,
      gender,
    );
  }

  get(id: string): Promise<Array<Character>> {
    return this.rickAndMortyService.getCharacterById(id);
  }

  create(character: Character): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(character: Character): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string) {
    throw new Error('Method not implemented.');
  }
}
