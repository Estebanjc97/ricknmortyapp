import { Injectable, Inject } from '@nestjs/common';
import { CharacterRepository } from '../domain/repository/characters.repository';

@Injectable()
export class DeleteCharactersUseCase {
  constructor(
    @Inject('CharacterRepositoryImpl')
    private readonly characterRepository: CharacterRepository,
  ) {}

  execute(id: string): Promise<void> {
    return this.characterRepository.delete(id);
  }
}
