import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../utils/api.entity';
import { Character } from './characters.entity';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = 'https://ricknmortyserver-467042232272.us-central1.run.app';
  //private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCharacters(start: number, end: number): Observable<ApiResponse<Character>> {
    return this.http.get<any>(`${this.apiUrl}/characters?start=${start}&end=${end}`);
  }

  createCharacter(character: Character): Observable<void> {
    return this.http.post<any>(`${this.apiUrl}/characters`, character);
  }

  updateCharacter(character: Character): Observable<void> {
    return this.http.put<any>(`${this.apiUrl}/characters`, character);
  }

}
