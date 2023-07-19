import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Email } from 'src/app/models/email';
import { EmailService } from '../email.service';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss'],
})
export class EmailShowComponent implements OnInit {
  email$!: Observable<Email>;
  isEmailLoading$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
    private loaderService : LoaderService
  ) {}

  ngOnInit(): void {
    this.email$ = this.route.params.pipe(
      map((params: Params) => params['id']),
      switchMap((value: string) => this.emailService.getEmail(value))
    );
    this.isEmailLoading$ = this.loaderService.getEmailFetching();
  }
}
