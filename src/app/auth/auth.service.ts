import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupCredentials } from '../models/signup-credentials';
import { BehaviorSubject, finalize, shareReplay, tap } from 'rxjs';
import { SigninComponent } from './signin/signin.component';
import { LoaderService } from '../shared/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'https://api.angular-email.com/auth';
  private signedin$: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);
  username = '';

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  usernameAvailable(username: string) {
    this.loaderService.checkingUsernameAvailable();
    return this.http
      .post<{ available: boolean }>(`${this.baseUrl}/username`, {
        username,
      })
      .pipe(finalize(() => this.loaderService.checkingUsernameComplete()));
  }

  signup(credentials: SignupCredentials) {
    this.loaderService.FormSubmitting();
    return this.http
      .post<{ username: string }>(`${this.baseUrl}/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          if (username) {
            this.signedin$.next(true);
            this.username = username;
          }
        }),
        finalize(() => this.loaderService.FormSubmitted())
      );
  }

  signin(credentials: SigninComponent) {
    this.loaderService.FormSubmitting();
    return this.http
      .post<{ username: string }>(`${this.baseUrl}/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        }),
        finalize(() => this.loaderService.FormSubmitted())
      );
  }

  checkAuth() {
    this.loaderService.loadingOn();
    return this.http
      .get<{ authenticated: boolean; username: string | null }>(
        `${this.baseUrl}/signedin`
      )
      .pipe(
        tap(({ authenticated, username }) => {
          if (authenticated && username !== null) {
            this.signedin$.next(true);
            this.username = username;
            this.router.navigateByUrl('/inbox');
          }
        }),
        shareReplay(1),
        finalize(() => this.loaderService.loadingOff())
      );
  }

  signout() {
    this.loaderService.loadingOn();
    return this.http.post<{}>(`${this.baseUrl}/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
        this.router.navigateByUrl('/signout');
      }),
      finalize(() => this.loaderService.loadingOff())
    );
  }

  getSignedin() {
    return this.signedin$.asObservable();
  }
}
