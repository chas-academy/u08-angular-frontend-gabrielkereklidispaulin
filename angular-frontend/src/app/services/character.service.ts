import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://u05-restful-api.onrender.com/characters';
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  public characters$ = this.charactersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCharacters();
  }

  // Get all characters
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl).pipe(
      tap(characters => this.charactersSubject.next(characters))
    );
  }

  // Get character by ID
  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  // Create new character
  createCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(this.apiUrl, character).pipe(
      tap(newCharacter => {
        const currentCharacters = this.charactersSubject.value;
        this.charactersSubject.next([...currentCharacters, newCharacter]);
      })
    );
  }

  // Update character
  updateCharacter(id: string, character: Character): Observable<Character> {
    return this.http.put<Character>(`${this.apiUrl}/${id}`, character).pipe(
      tap(updatedCharacter => {
        const currentCharacters = this.charactersSubject.value;
        const updatedCharacters = currentCharacters.map(c => 
          c._id === id ? updatedCharacter : c
        );
        this.charactersSubject.next(updatedCharacters);
      })
    );
  }

  // Delete character
  deleteCharacter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentCharacters = this.charactersSubject.value;
        const filteredCharacters = currentCharacters.filter(c => c._id !== id);
        this.charactersSubject.next(filteredCharacters);
      })
    );
  }

  // Load characters on service initialization
  private loadCharacters(): void {
    this.getCharacters().subscribe();
  }

  // Get characters from cache
  getCharactersFromCache(): Character[] {
    return this.charactersSubject.value;
  }
}
