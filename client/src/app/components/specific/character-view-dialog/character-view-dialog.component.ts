import { AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { Character } from '../../../services/characters/characters.entity';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { isCharacterLocation } from '../../../utils/characters.utils';
import { EpisodesService } from '../../../services/episodes/episodes.service';
import { filter } from 'rxjs';
import { RickAndMortyApiInfo, RickAndMortyApiResponse } from '../../../utils/api.entity';
import { Episode } from '../../../services/episodes/episodes.entity';
import { isPlatformBrowser } from '@angular/common';
import { CharactersService } from '../../../services/characters/characters.service';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'character-view-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './character-view-dialog.component.html',
  styleUrl: './character-view-dialog.component.scss'
})
export class CharacterViewDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('episodesSelect') matSelect!: MatSelect;

  readonly dialog = inject(MatDialog);

  dialogMode: "edit" | "create" = "create";

  private panel!: HTMLElement;

  readonly charactersService = inject(CharactersService);
  readonly episodesService = inject(EpisodesService);
  readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<CharacterViewDialogComponent>);
  readonly data = inject<Character>(MAT_DIALOG_DATA);

  characterImage = signal('');

  episodes = signal<Array<Episode>>([]);
  episodesInfo = signal<RickAndMortyApiInfo>({
    count: 0,
    next: null,
    pages: 0,
    prev: null
  });

  form: FormGroup;

  statuses = [
    {value: 'Dead', viewValue: 'Dead'},
    {value: 'Alive', viewValue: 'Alive'}
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.dialogMode = 'edit';
    } else {
      this.dialogMode = 'create';
    }
    this.characterImage.set(this.data.image);
    this.getEpisodes("1");
    this.buildForm();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.matSelect.openedChange.subscribe((opened) => {
        if (opened) {
          this.setupScrollListener();
        }
      });
    }
  }

  setupScrollListener() {
    this.panel = this.matSelect.panel?.nativeElement;

    if (this.panel) {
      this.panel.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll() {
    if (isPlatformBrowser(this.platformId) && this.panel) {
      const scrollTop = this.panel.scrollTop;
      const scrollHeight = this.panel.scrollHeight;
      const offsetHeight = this.panel.offsetHeight;

      if (scrollTop + offsetHeight >= scrollHeight) {
        if (this.episodesInfo().next) {
          this.getEpisodes(this.episodesInfo().next?.slice(-1) || "");
        }
      }
    }
  }

  getEpisodes(page: string) {
    this.episodesService.getEpisodes(page)
    .pipe(
      filter( (characters: RickAndMortyApiResponse<Episode>) => characters.results.length > 0 )
    )
    .subscribe({
      next: (response) => this.processEpisodes(response),
      error: () => alert("Error getting the episodes")
    });
  }

  processEpisodes(response: RickAndMortyApiResponse<Episode>) {
    this.episodes.update(prevEpisodes => [...prevEpisodes, ...response.results]);
    this.episodesInfo.set(response.info);
  }

  buildForm() {
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        const value = this.data[key as keyof Character];
        if (typeof value === "string" && key !== "created") {
          this.form.addControl(key, new FormControl(value, [Validators.required, Validators.minLength(3)]))
        } else if (isCharacterLocation(value)) {
          this.form.addControl(`${key}-name`, new FormControl(value.name, [Validators.required, Validators.minLength(3)]))
          this.form.addControl(`${key}-url`, new FormControl(value.url, [Validators.required, Validators.minLength(3)]))
        }
      }
    }
    this.form.addControl('episodes', new FormControl(this.data.episode, [Validators.required]))
    this.setFormListenners();
  }

  setFormListenners() {
    this.form.get('image')?.valueChanges.subscribe((newImage) => {
      this.characterImage.set(newImage);
    });
  }

  handleChanges() {
    const character = this.createCharacterFromFormData();
    if (this.dialogMode === 'edit') {
      this.updateCharacter({ id: this.data.id, ...character });
    } else {
      this.createCharacter(character);
    }
  }

  updateCharacter(character: Character) {
    this.charactersService.updateCharacter(character)
    .subscribe({
      next: () => this.alertOperationAndClose("Character Updated!"),
      error: () => alert("Error updating the character!"),
    });
  }

  createCharacter(character: Character) {
    this.charactersService.createCharacter(character)
    .subscribe({
      next: () => this.alertOperationAndClose("Character Created!"),
      error: () => alert("Error creating the character!"),
    });
  }

  deleteCharacter() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: `Delete ${this.data.name}`,
        question: `Are you sure you want to delete this character?`
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.charactersService.deleteCharacter(this.data.id || 0)
        .subscribe({
          next: () => this.alertOperationAndClose("Character deleted!"),
          error: () => { alert("Error deleting the character!") },
        })
      }
    });
  }

  alertOperationAndClose(message: string) {
    alert(message); 
    this.dialogRef.close("refresh");
  }

  createCharacterFromFormData():Character {
    return {
      name: this.form.value.name,
      status: this.form.value.status,
      species: this.form.value.species,
      type: this.form.value.type,
      gender: this.form.value.gender,
      origin: {
        name: this.form.value["origin-name"],
        url: this.form.value["origin-url"],
      },
      location: {
        name: this.form.value["location-name"],
        url: this.form.value["location-url"],
      },
      image: this.form.value.image,
      episode: this.form.value.episodes,
      url: this.form.value.url,
      created: this.data.created,
    };
  }

}
