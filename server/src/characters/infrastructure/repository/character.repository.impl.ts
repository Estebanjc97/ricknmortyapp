import { Injectable } from '@nestjs/common';
import { Character } from 'src/characters/domain/entities/character.entity';
import { CharacterRepository } from 'src/characters/domain/repository/characters.repository';
import { FirestoreFilter } from 'src/services/firestore/firestore.entity';
import { FirestoreService } from 'src/services/firestore/firestore.service';
import { RickAndMortyService } from 'src/services/rickAndMorty/rickAndMorty.service';
import { ApiResponse } from 'src/utils/entities/api.entity';
import { getIds } from 'src/utils/rickAndMortyApi/rickAndMortyApi.utils';

const apiMaxPages = 42;
const charactersCollection = 'characters';
const deletedCollection = 'deleted';

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
  constructor(
    private readonly rickAndMortyService: RickAndMortyService,
    private readonly firestoreService: FirestoreService,
  ) {}

  async getAll(
    limit: number = 8,
    page: number = 1,
    name?: string,
    status?: string,
    type?: string,
    species?: string,
    gender?: string,
  ): Promise<ApiResponse<Character>> {
    try {
      const filterParams: { [key: string]: string | undefined } = {
        name,
        status,
        type,
        species,
        gender,
      };
      const filters: FirestoreFilter[] = Object.entries(filterParams).reduce(
        (accum, [field, value]) => {
          if (value) {
            accum.push({ field, operator: '==', value });
          }
          return accum;
        },
        [] as FirestoreFilter[],
      );

      const createdCharacters = await this.firestoreService.getAllDocuments(
        charactersCollection,
        limit,
        page,
        filters,
        'id',
        'asc',
      );

      const totalCharacters =
        await this.firestoreService.getTotalDocuments(charactersCollection);

      return {
        info: {
          request: 'getAll',
          total: totalCharacters,
          status: 200,
        },
        results: createdCharacters,
      };
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<Array<Character>> {
    const results = [];

    try {
      const promises = getIds(id).map((_id) =>
        this.firestoreService.getDocument(charactersCollection, _id),
      );
      const storedCharacters = await Promise.all(promises);

      results.push(...storedCharacters.filter((character) => character));

      return results;
    } catch (error) {
      throw error;
    }
  }

  async create(character: Character): Promise<void> {
    try {
      const totalCharacters =
        await this.firestoreService.getTotalDocuments(charactersCollection);
      const nextId = totalCharacters + 2;
      const created = new Date().toISOString();
      await this.firestoreService.addDocument(
        charactersCollection,
        `${nextId}`,
        {
          id: nextId,
          ...character,
          created,
        },
      );
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(character: Character): Promise<void> {
    if (!character.id) {
      throw new Error('Should send the character Id.');
    }

    if (character.created) delete character.created;

    try {
      await this.firestoreService.updateDocument(
        charactersCollection,
        `${character.id}`,
        character,
      );
      return;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const character = await this.firestoreService.getDocument(
        charactersCollection,
        id,
      );
      const deleted = new Date().toISOString();
      await this.firestoreService.addDocument(deletedCollection, id, {
        deleted,
        ...character,
      });
      await this.firestoreService.deleteDocument(charactersCollection, id);
      return;
    } catch (error) {
      throw error;
    }
  }

  async migrateApiData() {
    let promises = [];
    console.log('start migration');
    try {
      for (let index = 1; index <= apiMaxPages; index++) {
        promises.push(this.rickAndMortyService.getAllCharacters(index));
      }
      const allPromises = await Promise.all(promises);
      promises = [];
      allPromises.forEach((resultPromise) => {
        resultPromise.results.forEach((character) => {
          promises.push(
            this.firestoreService.addDocument(
              charactersCollection,
              `${character.id}`,
              character,
            ),
          );
        });
      });
      await Promise.all(promises);
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
