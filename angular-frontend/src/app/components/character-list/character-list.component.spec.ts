import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterListComponent } from './character-list.component';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.interface';
import { of, throwError } from 'rxjs';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let characterService: jasmine.SpyObj<CharacterService>;

  const mockCharacter: Character = {
    _id: '1',
    name: 'Test Character',
    weight_class: 'medium',
    movement_speed: 60,
    original_game_series: 'Test Game',
    tier_ranking: 'A',
    notable_players: ['Player 1']
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharacterService', [
      'getCharacters',
      'createCharacter',
      'updateCharacter',
      'deleteCharacter'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CharacterService, useValue: spy }
      ]
    }).compileComponents();

    characterService = TestBed.inject(CharacterService) as jasmine.SpyObj<CharacterService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    const mockCharacters = [mockCharacter];
    characterService.getCharacters.and.returnValue(of(mockCharacters));

    component.ngOnInit();

    expect(characterService.getCharacters).toHaveBeenCalled();
    expect(component.characters).toEqual(mockCharacters);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading characters', () => {
    characterService.getCharacters.and.returnValue(throwError(() => new Error('Test error')));

    component.ngOnInit();

    expect(component.errorMessage).toBe('Error loading characters');
    expect(component.isLoading).toBeFalse();
  });

  it('should create character when form is valid', () => {
    const newCharacter = { ...mockCharacter, _id: undefined };
    characterService.createCharacter.and.returnValue(of(mockCharacter));
    component.characterForm.patchValue(newCharacter);

    component.onSubmit();

    expect(characterService.createCharacter).toHaveBeenCalledWith(newCharacter);
    expect(component.characterForm.pristine).toBeTrue();
  });

  it('should not create character when form is invalid', () => {
    component.characterForm.patchValue({ name: '' });

    component.onSubmit();

    expect(characterService.createCharacter).not.toHaveBeenCalled();
  });

  it('should start editing character', () => {
    component.startEdit(mockCharacter);

    expect(component.isEditing).toBeTrue();
    expect(component.editingCharacter).toEqual(mockCharacter);
    expect(component.editForm.value.name).toBe(mockCharacter.name);
  });

  it('should cancel editing', () => {
    component.startEdit(mockCharacter);
    component.cancelEdit();

    expect(component.isEditing).toBeFalse();
    expect(component.editingCharacter).toBeNull();
  });

  it('should update character when edit form is valid', () => {
    const updatedCharacter = { ...mockCharacter, name: 'Updated' };
    characterService.updateCharacter.and.returnValue(of(updatedCharacter));
    component.startEdit(mockCharacter);
    component.editForm.patchValue({ name: 'Updated' });

    component.onEditSubmit();

    expect(characterService.updateCharacter).toHaveBeenCalledWith(mockCharacter._id, updatedCharacter);
  });

  it('should delete character with confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    characterService.deleteCharacter.and.returnValue(of(undefined));

    component.deleteCharacter('1');

    expect(characterService.deleteCharacter).toHaveBeenCalledWith('1');
  });

  it('should get correct tier color', () => {
    expect(component.getTierColor('S')).toBe('#ffcc00');
    expect(component.getTierColor('A')).toBe('#ff6b6b');
    expect(component.getTierColor('B')).toBe('#4ecdc4');
  });

  it('should get correct weight class color', () => {
    expect(component.getWeightClassColor('light')).toBe('#ffcc00');
    expect(component.getWeightClassColor('medium')).toBe('#4ecdc4');
    expect(component.getWeightClassColor('heavy')).toBe('#ff6b6b');
  });
});
