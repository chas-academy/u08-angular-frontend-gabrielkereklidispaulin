import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { Character } from '../models/character.interface';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  const mockCharacter: Character = {
    _id: '1',
    name: 'Test Character',
    weight_class: 'medium',
    movement_speed: 60,
    original_game_series: 'Test Game',
    tier_ranking: 'A',
    notable_players: ['Player 1', 'Player 2']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all characters', () => {
    const mockCharacters = [mockCharacter];

    service.getCharacters().subscribe(characters => {
      expect(characters).toEqual(mockCharacters);
    });

    const req = httpMock.expectOne('http://localhost:4000/characters');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters);
  });

  it('should get character by id', () => {
    service.getCharacterById('1').subscribe(character => {
      expect(character).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne('http://localhost:4000/characters/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacter);
  });

  it('should create character', () => {
    const newCharacter: Omit<Character, '_id'> = {
      name: 'New Character',
      weight_class: 'light',
      movement_speed: 70,
      original_game_series: 'New Game',
      tier_ranking: 'S'
    };

    service.createCharacter(newCharacter).subscribe(character => {
      expect(character).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne('http://localhost:4000/characters');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCharacter);
    req.flush(mockCharacter);
  });

  it('should update character', () => {
    const updatedCharacter = { ...mockCharacter, name: 'Updated Character' };

    service.updateCharacter('1', updatedCharacter).subscribe(character => {
      expect(character).toEqual(updatedCharacter);
    });

    const req = httpMock.expectOne('http://localhost:4000/characters/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCharacter);
    req.flush(updatedCharacter);
  });

  it('should delete character', () => {
    service.deleteCharacter('1').subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:4000/characters/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
