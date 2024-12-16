import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { CharactersListComponent } from '../../components/specific/characters-list/characters-list.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, CharactersListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
