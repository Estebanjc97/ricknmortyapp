import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user = this.authService.getCurrentUserSignal();

  constructor() {}

  async login() {
    try {
      await this.authService.login();
      alert("Logged in!");
    } catch (error) {
      alert("Error loggin in, please try again.")      
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      alert("Logged out");
    } catch (error) {
      alert("Error loggin out, please try again.")      
    }
  }

}
