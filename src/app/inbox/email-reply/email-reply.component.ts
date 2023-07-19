import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Email } from 'src/app/models/email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss'],
})
export class EmailReplyComponent implements OnChanges {
  showModal = false;
  @Input() email!: Email;

  constructor(private emailService: EmailService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const receivedEmail: Email = changes['email'].currentValue;
    this.email = {
      ...receivedEmail,
      from: receivedEmail.to,
      to: receivedEmail.from,
      subject: `RE: ${receivedEmail.subject}`,
      text: `\n\n\n\n-------${receivedEmail.from} wrote: \n${receivedEmail.text}`
    };
  }

  openReply() {
    this.showModal = true;
  }

  closeReply() {
    this.showModal = false;
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe({
      next: () => {
        this.showModal = false;
      },
    });
  }
}
