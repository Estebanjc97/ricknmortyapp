import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CharactersService } from '../../services/characters/characters.service';
import { Character } from '../../services/characters/characters.entity';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CharacterCardComponent, MatGridListModule, MatPaginatorModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  items:Array<Character> = [];

  constructor(private readonly charactersService: CharactersService) 
    {}

  ngOnInit(): void {
    this.getCharacters(8);
  }

  getCharacters(limit: number) {
    this.charactersService.getCharacters(limit).subscribe(response => {
      this.items = response.results;
    });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e)
    this.getCharacters(e.pageSize);
  }
  
}
