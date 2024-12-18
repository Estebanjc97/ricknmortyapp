import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters/characters.service';
import { Character } from '../../../services/characters/characters.entity';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ApiResponse } from '../../../utils/api.entity';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CharacterViewDialogComponent } from '../character-view-dialog/character-view-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { FloatingButtonComponent } from '../../common/floating-button/floating-button.component';
import { DOOMIE_CHARACTER } from '../../../utils/characters.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const DEFAULT_PAGINATION = {
  length: 0,
  pageSize: 8,
  pageIndex: 0,
  previousPageIndex: 0,
}

@Component({
  selector: 'characters-list',
  imports: [CharacterCardComponent, MatGridListModule, MatPaginatorModule, FloatingButtonComponent, MatProgressSpinnerModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})
export class CharactersListComponent implements OnInit {

  isLoading = signal(false);

  readonly charactersService = inject(CharactersService);
  readonly dialog = inject(MatDialog);

  readonly items = signal<Array<Character>>([]);
  readonly pagination = signal(DEFAULT_PAGINATION);
  readonly pageSizeOptions = [8, 16, 32, 64];

  cols: number = 1;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.getCharacters();
    if (isPlatformBrowser(this.platformId)) {
      this.updateColumns(window.innerWidth);
    } else {
      this.cols = 3;
    }
  }

  getCharacters(useLoader = true) {
    useLoader && this.isLoading.set(true);
    const limit = this.pagination().pageSize;
    const page = this.pagination().pageIndex + 1;
    this.charactersService.getCharacters(limit, page)
    .pipe(
      filter( (characters:ApiResponse<Character>) => characters.results.length > 0 )
    )
    .subscribe({
      next: (response: ApiResponse<Character>) => {
        this.pagination().length = response.info.total;
        this.items.set(response.results);
      },
      error: () => alert("Error getting characters"),
      complete: () => this.isLoading.set(false)
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
    const dialogRef = this.dialog.open(CharacterViewDialogComponent, {
      data: character,
      width: "70%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "refresh") {
        this.getCharacters(false);
      }
    });
  }

  onFloatingButtonClick() {
    this.openCharacterView(DOOMIE_CHARACTER);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const width = event.target.innerWidth;
      this.updateColumns(width);
    }
  }

  private updateColumns(width: number) {
    if (width < 600) {
      this.cols = 1; 
    } else if (width < 1024) {
      this.cols = 2; 
    } else {
      this.cols = 4; 
    }
  }

}
