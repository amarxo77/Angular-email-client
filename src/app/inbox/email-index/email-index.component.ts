import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Observable } from 'rxjs';
import { EmailSummary } from 'src/app/models/email-summary';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.scss'],
})
export class EmailIndexComponent implements OnInit {
  emails$!: Observable<EmailSummary[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private emailService: EmailService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.emails$ = this.emailService.getEmails();
    this.isLoading$ = this.loaderService.getFormSubmission();
  }
}
