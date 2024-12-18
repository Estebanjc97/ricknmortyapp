import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Auth, GoogleAuthProvider, signInWithPopup, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  user = user(this.auth);
  userSubscription: Subscription;
  currentUser = signal<User | null>(null);

  constructor() {
    this.userSubscription = this.user.subscribe((aUser: User | null) => {
      this.currentUser.set(aUser);
    })
  }

  async login() {
    await signInWithPopup(this.auth, new GoogleAuthProvider);
  }

  async logout() {
    await this.auth.signOut();
    alert("Logged out");
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
