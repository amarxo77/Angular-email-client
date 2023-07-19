import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();
  isLoading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading();
  }

  onDismissClick() {
    this.dismiss.emit();
  }
}
