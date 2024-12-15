import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/utils/entities/api.entity';
import { Character } from 'src/characters/domain/entities/character.entity';

@Injectable()
export class RickAndMortyService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private readonly httpService: HttpService) {}

  async getAllCharacters(
    page?: number,
    name?: string,
    status?: string,
    type?: string,
    species?: string,
    gender?: string,
  ): Promise<ApiResponse<Character>> {
    const observable = this.httpService.get(`${this.apiUrl}/character`, {
      params: {
        page,
        name,
        status,
        species,
        type,
        gender,
      },
    });
    const response: AxiosResponse = await lastValueFrom(observable);
    return response.data;
  }

  async getCharacterById(id: string): Promise<any> {
    const observable = this.httpService.get(`${this.apiUrl}/character/${id}`);
    const response: AxiosResponse = await lastValueFrom(observable);
    return response.data;
  }

  async getAllLocations(
    page?: number,
    name?: string,
    type?: string,
    dimension?: string,
  ): Promise<ApiResponse<any>> {
    const observable = this.httpService.get(`${this.apiUrl}/location`, {
      params: {
        page,
        name,
        type,
        dimension,
      },
    });
    const response: AxiosResponse = await lastValueFrom(observable);
    return response.data;
  }

  async getLocationById(id: string): Promise<any> {
    const observable = this.httpService.get(`${this.apiUrl}/location/${id}`);
    const response: AxiosResponse = await lastValueFrom(observable);
    return response.data;
  }

  async getAllEpisodes(
    page?: number,
    name?: string,
    episode?: string,
  ): Promise<ApiResponse<any>> {
    const observable = this.httpService.get(`${this.apiUrl}/episode`, {
      params: {
        page,
        name,
        episode,
      },
    });
    const response: AxiosResponse = await lastValueFrom(observable);
    return response.data;
  }

  async getEpisodeById(id: string): Promise<any> {
    const observable = this.httpService.get(`${this.apiUrl}/episode/${id}`);
    const response: AxiosResponse = await lastValueFrom(observable);
    return response.data;
  }
}
