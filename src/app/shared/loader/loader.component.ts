import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading()
  }
}
