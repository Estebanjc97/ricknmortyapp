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
  pagination = {
    length: 0,
    pageSize: 8,
    pageIndex: 0,
    previousPageIndex: 0,
  };
  pageSizeOptions = [8, 16, 32, 64];

  constructor(private readonly charactersService: CharactersService) 
    {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    const start = this.pagination.pageIndex * this.pagination.pageSize;
    const end = (this.pagination.pageIndex + 1) * this.pagination.pageSize;
    this.charactersService.getCharacters(start, end).subscribe(response => {
      this.pagination.length = response.info.total;
      this.items = response.results;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.previousPageIndex = e.previousPageIndex || 0;
    this.pagination.pageSize = e.pageSize;
    this.getCharacters();
  }
  
}
