export interface Character {
  _id?: string;
  name: string;
  weight_class: 'light' | 'medium' | 'heavy';
  movement_speed: number;
  original_game_series: string;
  tier_ranking: 'S' | 'A' | 'B' | 'C' | 'D';
  notable_players?: string[];
}
