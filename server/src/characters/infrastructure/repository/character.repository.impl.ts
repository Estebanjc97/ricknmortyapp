import { Injectable } from '@nestjs/common';
import { Character } from 'src/characters/domain/entities/character.entity';
import { CharacterRepository } from 'src/characters/domain/repository/characters.repository';

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
  constructor() {}

  getAll(): Promise<Array<Character>> {
    return new Promise((res) => {
      res([
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
          ],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z',
        },
      ]);
    });
  }

  get(id: string): Promise<Character> {
    throw new Error('Method not implemented.');
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
