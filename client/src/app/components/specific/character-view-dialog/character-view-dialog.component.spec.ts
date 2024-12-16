import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterViewDialogComponent } from './character-view-dialog.component';

describe('CharacterViewDialogComponent', () => {
  let component: CharacterViewDialogComponent;
  let fixture: ComponentFixture<CharacterViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
