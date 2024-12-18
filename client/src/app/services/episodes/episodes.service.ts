import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from './episodes.entity';
import { Observable } from 'rxjs';
import { RickAndMortyApiResponse } from '../../utils/api.entity';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getEpisodes(page: string): Observable<RickAndMortyApiResponse<Episode>> {
    return this.http.get<any>(`${this.apiUrl}/episode?page=${page}`);
  }

}
