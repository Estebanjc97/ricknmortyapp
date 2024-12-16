import { Component, Input } from '@angular/core';

@Component({
  selector: 'character-card',
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() title: string = "CardTitle";
  @Input() imageUrl: string = 'https://thehumanist.com/wp-content/uploads/2015/09/rickmorty.jpg';
  @Input() description: string = "Description...";
  @Input() footerInfo: string = "footer...";
}
