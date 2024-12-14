import { Module } from '@nestjs/common';
import { CharacterRepositoryImpl } from './infrastructure/repository/character.repository.impl';
import { GetAllCharactersUseCase } from './application/get-all.usecase';
import { GetAllCharactersController } from './infrastructure/controller/getAll.controller';

@Module({
  controllers: [GetAllCharactersController],
  imports: [],
  providers: [
    {
      provide: 'CharacterRepositoryImpl',
      useClass: CharacterRepositoryImpl,
    },
    GetAllCharactersUseCase,
  ],
  exports: [],
})
export class CharactersModule {}
