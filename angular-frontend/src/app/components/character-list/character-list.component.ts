import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  isEditing = false;
  editingCharacter: Character | null = null;
  characterForm: FormGroup;
  editForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private characterService: CharacterService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      weight_class: ['', Validators.required],
      movement_speed: ['', Validators.required],
      original_game_series: ['', Validators.required],
      tier_ranking: ['', Validators.required],
      notable_players: [[]]
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      weight_class: ['', Validators.required],
      movement_speed: ['', Validators.required],
      original_game_series: ['', Validators.required],
      tier_ranking: ['', Validators.required],
      notable_players: [[]]
    });
  }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.characterService.characters$.subscribe({
      next: (characters) => {
        this.characters = characters;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading characters';
        this.isLoading = false;
        console.error('Error loading characters:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      this.isLoading = true;
      const newCharacter: Character = this.characterForm.value;
      
      this.characterService.createCharacter(newCharacter).subscribe({
        next: () => {
          this.characterForm.reset();
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Error creating character';
          this.isLoading = false;
          console.error('Error creating character:', error);
        }
      });
    }
  }

  startEdit(character: Character): void {
    this.editingCharacter = character;
    this.isEditing = true;
    this.editForm.patchValue(character);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingCharacter = null;
    this.editForm.reset();
  }

  onEditSubmit(): void {
    if (this.editForm.valid && this.editingCharacter) {
      this.isLoading = true;
      const updatedCharacter: Character = { ...this.editingCharacter, ...this.editForm.value };
      
      this.characterService.updateCharacter(this.editingCharacter._id!, updatedCharacter).subscribe({
        next: () => {
          this.isEditing = false;
          this.editingCharacter = null;
          this.editForm.reset();
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Error updating character';
          this.isLoading = false;
          console.error('Error updating character:', error);
        }
      });
    }
  }

  deleteCharacter(id: string): void {
    if (confirm('Are you sure you want to delete this character?')) {
      this.isLoading = true;
      this.characterService.deleteCharacter(id).subscribe({
        next: () => {
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Error deleting character';
          this.isLoading = false;
          console.error('Error deleting character:', error);
        }
      });
    }
  }

  getTierColor(tier: string): string {
    const tierColors: { [key: string]: string } = {
      'S': '#ffcc00',
      'A': '#ff6b6b',
      'B': '#4ecdc4',
      'C': '#45b7d1',
      'D': '#96ceb4'
    };
    return tierColors[tier] || '#ffffff';
  }

  getWeightClassColor(weightClass: string): string {
    const weightColors: { [key: string]: string } = {
      'light': '#ffcc00',
      'medium': '#4ecdc4',
      'heavy': '#ff6b6b'
    };
    return weightColors[weightClass] || '#ffffff';
  }

  viewCharacter(id: string): void {
    this.router.navigate(['/character', id]);
  }
}
