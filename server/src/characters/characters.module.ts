import { Module } from '@nestjs/common';
import { CharacterRepositoryImpl } from './infrastructure/repository/character.repository.impl';
import { GetAllCharactersUseCase } from './application/get-all.usecase';
import { CharactersController } from './infrastructure/controller/characters.controller';
import { RickAndMortyService } from 'src/services/rickAndMorty/rickAndMorty.service';
import { HttpModule } from '@nestjs/axios';
import { GetCharactersUseCase } from './application/get.usecase';
import { ConfigService } from '@nestjs/config';
import { FirestoreService } from 'src/services/firestore/firestore.service';
import { CreateCharactersUseCase } from './application/create.usecase';
import { UpdateCharactersUseCase } from './application/update.usecase';
import { DeleteCharactersUseCase } from './application/delete.usecase';

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
    CreateCharactersUseCase,
    UpdateCharactersUseCase,
    DeleteCharactersUseCase,
    RickAndMortyService,
    ConfigService,
    FirestoreService,
  ],
  exports: [],
})
export class CharactersModule {}
