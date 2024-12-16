import { Component, inject, OnInit, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters/characters.service';
import { Character } from '../../../services/characters/characters.entity';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ApiResponse } from '../../../utils/api.entity';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CharacterViewDialogComponent } from '../character-view-dialog/character-view-dialog.component';

const DEFAULT_PAGINATION = {
  length: 0,
  pageSize: 8,
  pageIndex: 0,
  previousPageIndex: 0,
}

@Component({
  selector: 'characters-list',
  imports: [CharacterCardComponent, MatGridListModule, MatPaginatorModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})
export class CharactersListComponent implements OnInit {

  readonly charactersService = inject(CharactersService);
  readonly dialog = inject(MatDialog);

  readonly items = signal<Array<Character>>([]);
  readonly pagination = signal(DEFAULT_PAGINATION);
  readonly pageSizeOptions = [8, 16, 32, 64];

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    const start = (this.pagination().pageIndex * this.pagination().pageSize) + 1;
    const end = (this.pagination().pageIndex + 1) * this.pagination().pageSize;
    this.charactersService.getCharacters(start, end)
    .pipe(
      filter( (characters:ApiResponse<Character>) => characters.results.length > 0 )
    )
    .subscribe((response: ApiResponse<Character>) => {
      this.pagination().length = response.info.total;
      this.items.set(response.results);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.update(prevState => (
      { 
        ...prevState, 
        pageIndex: e.pageIndex, 
        previousPageIndex: e.previousPageIndex || 0, 
        pageSize: e.pageSize 
      }))
    this.getCharacters();
  }

  openCharacterView(character: Character): void {
    console.log("OPEN Dialog!")
    console.log(character);
    const dialogRef = this.dialog.open(CharacterViewDialogComponent, {
      data: { msg: "open" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        //Read the result, for changes.
      }
    });
  }

}
