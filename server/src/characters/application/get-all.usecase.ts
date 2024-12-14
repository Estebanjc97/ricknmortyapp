import { Injectable, Inject } from '@nestjs/common';
import { CharacterRepository } from '../domain/repository/characters.repository';
import { Character } from '../domain/entities/character.entity';

@Injectable()
export class GetAllCharactersUseCase {
  constructor(
    @Inject('CharacterRepositoryImpl')
    private readonly characterRepository: CharacterRepository,
  ) {}

  execute(): Promise<Array<Character>> {
    return this.characterRepository.getAll();
  }
}
