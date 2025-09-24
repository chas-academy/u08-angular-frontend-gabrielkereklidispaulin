import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.interface';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.loadCharacter();
  }

  loadCharacter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.characterService.getCharacterById(id).subscribe({
        next: (character) => {
          this.character = character;
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Character not found';
          this.isLoading = false;
          console.error('Error loading character:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
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
}
