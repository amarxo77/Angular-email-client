import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailSummary } from '../models/email-summary';
import { Email } from '../models/email';
import { finalize, shareReplay } from 'rxjs';
import { LoaderService } from '../shared/loader.service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly baseUrl = 'https://api.angular-email.com/emails';

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getEmails() {
    this.loaderService.FormSubmitting();
    return this.http.get<EmailSummary[]>(`${this.baseUrl}`).pipe(
      shareReplay(1),
      finalize(() => this.loaderService.FormSubmitted())
    );
  }

  getEmail(emailId: string) {
    this.loaderService.isEmailFetching();
    return this.http.get<Email>(`${this.baseUrl}/${emailId}`).pipe(
      shareReplay(1),
      finalize(() => this.loaderService.isEmailFetchingCompleted())
    );
  }

  sendEmail(email: Email) {
    this.loaderService.loadingOn();
    return this.http.post(`${this.baseUrl}`, email).pipe(
      finalize(() => this.loaderService.loadingOff())
    );
  }
}
