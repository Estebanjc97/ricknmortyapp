import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../utils/api.entity';
import { Character } from './characters.entity';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  //private apiUrl = 'https://ricknmortyserver-467042232272.us-central1.run.app';
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCharacters(limit: number, page: number): Observable<ApiResponse<Character>> {
    return this.http.get<any>(`${this.apiUrl}/characters?limit=${limit}&page=${page}`);
  }

  createCharacter(character: Character): Observable<void> {
    return this.http.post<any>(`${this.apiUrl}/characters`, character);
  }

  updateCharacter(character: Character): Observable<void> {
    return this.http.put<any>(`${this.apiUrl}/characters`, character);
  }

  deleteCharacter(id: number): Observable<HttpEvent<any>> {
    return this.http.delete<any>(`${this.apiUrl}/characters/${id}`);
  }

}
