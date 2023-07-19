import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private checkUsernameAvailable$ = new BehaviorSubject<boolean>(false);
  private isFormSubmission$ = new BehaviorSubject<boolean>(false);
  private isEmailFetching$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  loadingOn() {
    this.loading$.next(true);
  }

  loadingOff() {
    this.loading$.next(false);
  }

  FormSubmitting() {
    this.isFormSubmission$.next(true);
  }

  FormSubmitted() {
    this.isFormSubmission$.next(false);
  }

  checkingUsernameAvailable() {
    this.checkUsernameAvailable$.next(true);
  }

  checkingUsernameComplete() {
    this.checkUsernameAvailable$.next(false);
  }

  isEmailFetching() {
    return this.isEmailFetching$.next(true);
  }

  isEmailFetchingCompleted() {
    return this.isEmailFetching$.next(false);
  }

  isLoading() {
    return this.loading$.asObservable();
  }

  isUsernameIsChecking() {
    return this.checkUsernameAvailable$.asObservable();
  }

  getFormSubmission() {
    return this.isFormSubmission$.asObservable();
  }

  getEmailFetching() {
    return this.isEmailFetching$.asObservable();
  }
}
