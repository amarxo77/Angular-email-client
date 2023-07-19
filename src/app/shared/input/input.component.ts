import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input('inputType') type = 'text';
  @Input() controlType = 'input';
  @Input() usernameCheck = '';

  checkUsernameAvailable$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.checkUsernameAvailable$ = this.loaderService.isUsernameIsChecking();
  }
}
