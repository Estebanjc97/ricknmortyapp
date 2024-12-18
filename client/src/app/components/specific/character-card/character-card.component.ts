import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Character } from '../../../services/characters/characters.entity';
import { DOOMIE_CHARACTER } from '../../../utils/characters.utils';



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
