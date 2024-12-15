import { Injectable, Inject } from '@nestjs/common';
import { CharacterRepository } from '../domain/repository/characters.repository';
import { Character } from '../domain/entities/character.entity';

@Injectable()
export class UpdateCharactersUseCase {
  constructor(
    @Inject('CharacterRepositoryImpl')
    private readonly characterRepository: CharacterRepository,
  ) {}

  execute(character: Character): Promise<void> {
    return this.characterRepository.update(character);
  }
}
