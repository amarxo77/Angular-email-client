import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map(() => null),
      catchError((err) => {
        console.log(err);
        if (err.status === 422 && err.statusText === 'Unprocessable Entity') {
          return of({ usernameInUse: true } as ValidationErrors);
        }
        return of({ noConnection: true });
      })
    );
  };
}
