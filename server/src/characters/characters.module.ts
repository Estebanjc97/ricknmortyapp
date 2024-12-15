import { Module } from '@nestjs/common';
import { CharacterRepositoryImpl } from './infrastructure/repository/character.repository.impl';
import { GetAllCharactersUseCase } from './application/get-all.usecase';
import { CharactersController } from './infrastructure/controller/characters.controller';
import { RickAndMortyService } from 'src/services/rickAndMorty/rickAndMorty.service';
import { HttpModule } from '@nestjs/axios';
import { GetCharactersUseCase } from './application/get.usecase';

@Module({
  controllers: [CharactersController],
  imports: [HttpModule],
  providers: [
    {
      provide: 'CharacterRepositoryImpl',
      useClass: CharacterRepositoryImpl,
    },
    GetAllCharactersUseCase,
    GetCharactersUseCase,
    RickAndMortyService,
  ],
  exports: [],
})
export class CharactersModule {}
