import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CharacterDetailComponent } from './character-detail.component';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.interface';
import { of, throwError } from 'rxjs';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let characterService: jasmine.SpyObj<CharacterService>;
  let activatedRoute: ActivatedRoute;

  const mockCharacter: Character = {
    _id: '1',
    name: 'Test Character',
    weight_class: 'medium',
    movement_speed: 60,
    original_game_series: 'Test Game',
    tier_ranking: 'A',
    notable_players: ['Player 1', 'Player 2']
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharacterService', ['getCharacterById']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CharacterService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    characterService = TestBed.inject(CharacterService) as jasmine.SpyObj<CharacterService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load character on init', () => {
    characterService.getCharacterById.and.returnValue(of(mockCharacter));

    component.ngOnInit();

    expect(characterService.getCharacterById).toHaveBeenCalledWith('1');
    expect(component.character).toEqual(mockCharacter);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading character', () => {
    characterService.getCharacterById.and.returnValue(throwError(() => new Error('Test error')));

    component.ngOnInit();

    expect(component.errorMessage).toBe('Character not found');
    expect(component.isLoading).toBeFalse();
  });

  it('should get correct tier color', () => {
    expect(component.getTierColor('S')).toBe('#ffcc00');
    expect(component.getTierColor('A')).toBe('#ff6b6b');
    expect(component.getTierColor('B')).toBe('#4ecdc4');
    expect(component.getTierColor('C')).toBe('#45b7d1');
    expect(component.getTierColor('D')).toBe('#96ceb4');
  });

  it('should get correct weight class color', () => {
    expect(component.getWeightClassColor('light')).toBe('#ffcc00');
    expect(component.getWeightClassColor('medium')).toBe('#4ecdc4');
    expect(component.getWeightClassColor('heavy')).toBe('#ff6b6b');
  });

  it('should return default color for unknown tier', () => {
    expect(component.getTierColor('unknown')).toBe('#ffffff');
  });

  it('should return default color for unknown weight class', () => {
    expect(component.getWeightClassColor('unknown')).toBe('#ffffff');
  });
});
