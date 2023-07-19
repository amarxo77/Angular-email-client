import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { LoaderComponent } from './loader/loader.component';
import { SmallLoaderComponent } from './small-loader/small-loader.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalComponent,
    LoaderComponent,
    SmallLoaderComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    InputComponent,
    ModalComponent,
    LoaderComponent,
    SmallLoaderComponent,
  ],
})
export class SharedModule {}
