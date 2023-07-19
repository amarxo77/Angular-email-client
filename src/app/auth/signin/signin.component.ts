import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authForm!: FormGroup;
  formSubmitting$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
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
    this.formSubmitting$ = this.loaderService.getFormSubmission();

    this.authForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  get username(): FormControl {
    return this.authForm.controls['username'] as FormControl;
  }

  get password(): FormControl {
    return this.authForm.controls['password'] as FormControl;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.authService.signin(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error.username && err.error.password) {
          this.authForm.setErrors({ invalidCredentials: true });
          return;
        }
        if (err.error.password) {
          this.authForm.setErrors({ inValidPassword: true });
          return;
        }
        if (err.status === 0) {
          return this.authForm.setErrors({ noConnection: true });
        }
        this.authForm.setErrors({ unknownError: true });
      },
    });
  }
}
