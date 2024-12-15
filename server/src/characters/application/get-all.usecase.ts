import { Injectable, Inject } from '@nestjs/common';
import { CharacterRepository } from '../domain/repository/characters.repository';
import { Character } from '../domain/entities/character.entity';
import { ApiResponse } from 'src/utils/entities/api.entity';

@Injectable()
export class GetAllCharactersUseCase {
  constructor(
    @Inject('CharacterRepositoryImpl')
    private readonly characterRepository: CharacterRepository,
  ) {}

  execute(
    page?: number,
    name?: string,
    status?: string,
    type?: string,
    species?: string,
    gender?: string,
  ): Promise<ApiResponse<Character>> {
    return this.characterRepository.getAll(
      page,
      name,
      status,
      type,
      species,
      gender,
    );
  }
}
