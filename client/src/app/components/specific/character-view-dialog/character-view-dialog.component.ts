import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

export interface DialogData { //Todo, Use character!
  msg: string
}

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
  ],
  templateUrl: './character-view-dialog.component.html',
  styleUrl: './character-view-dialog.component.scss'
})
export class CharacterViewDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CharacterViewDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
