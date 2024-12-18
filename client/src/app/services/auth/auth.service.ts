import { inject, Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private auth: Auth = inject(Auth);
  user = user(this.auth);
  userSubscription: Subscription;
  currentUser = signal<User | null>(null);

  constructor() {
    this.userSubscription = this.user.subscribe((aUser: User | null) => {
      console.log(aUser)
      this.currentUser.set(aUser);
    })
  }

  getCurrentUserSignal():WritableSignal<User | null> {
    return this.currentUser;
  }

  public login() {
    return signInWithPopup(this.auth, new GoogleAuthProvider);
  }

  public logout() {
    return this.auth.signOut();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
