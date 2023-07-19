import { AbstractControl, ValidationErrors } from '@angular/forms';

export class passwordMatch {
  static checkPasswords(control: AbstractControl<any, any>): ValidationErrors | null {
    const { password, passwordConfirmation } = control.value;
    return password === passwordConfirmation
      ? null
      : { passwordsNotMatch: true };
  }
}
