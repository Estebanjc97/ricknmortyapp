import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Character } from '../../../services/characters/characters.entity';

const DOOMIE_CHARACTER: Character = {
  created: "",
  episode: [],
  gender: "",
  id: 0,
  image: "",
  location: {
    name: "",
    url: ""
  },
  name: "Doomie man",
  origin: {
    name: "",
    url: ""
  },
  species: "",
  status: "",
  type: "",
  url: "",
}

@Component({
  selector: 'character-card',
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character: Character = DOOMIE_CHARACTER;
  @Output() clicked = new EventEmitter<Character>();

  handleCardClick() {
    this.clicked.emit(this.character);
  }
}
