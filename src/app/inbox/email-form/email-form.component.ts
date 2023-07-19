import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent implements OnChanges {
  @Output() emailSubmit = new EventEmitter()
  @Input() email!: Email;

  emailForm!: FormGroup;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { from, subject, text, to } = changes['email'].currentValue;

    this.emailForm = new FormGroup({
      to: new FormControl(to, {
        validators: [Validators.required, Validators.email],
      }),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, { validators: [Validators.required] }),
      text: new FormControl(text, { validators: [Validators.required] }),
    });
  }

  get to(): FormControl {
    return this.emailForm.controls['to'] as FormControl;
  }
  get from(): FormControl {
    return this.emailForm.controls['from'] as FormControl;
  }
  get subject(): FormControl {
    return this.emailForm.controls['subject'] as FormControl;
  }
  get text(): FormControl {
    return this.emailForm.controls['text'] as FormControl;
  }

  onSubmit() {
    if(this.emailForm.invalid) return;
    console.log(this.emailForm.getRawValue());
    this.emailSubmit.emit(this.emailForm.value)
  }
}
