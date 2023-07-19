import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../Validators/match-password';
import { UniqueUsername } from '../Validators/unique-username';
import { AuthService } from '../auth.service';
import { SignupCredentials } from 'src/app/models/signup-credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formSubmitting$!: Observable<boolean>;

  authForm = new FormGroup(
    {
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
        asyncValidators: this.uniqueUsername.validate,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      }),
      passwordConfirmation: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      }),
    },
    { validators: passwordMatch.checkPasswords }
  );

  constructor(
    private uniqueUsername: UniqueUsername,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    this.authService.getSignedin().subscribe({
      next: (isSignedIn) => {
        if (isSignedIn) {
          this.router.navigateByUrl('/inbox');
        }
      },
    });
  }

  ngOnInit(): void {
    this.formSubmitting$ = this.loaderService.getFormSubmission()
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const { value: credentials } = this.authForm;
    this.authService.signup(credentials as SignupCredentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 0) {
          this.authForm.setErrors({ noConnection: true });
        }
        this.authForm.setErrors({ unknownError: true });
      },
    });
  }
}
