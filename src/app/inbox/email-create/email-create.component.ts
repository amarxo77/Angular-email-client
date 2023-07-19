import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from 'src/app/models/email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss'],
})
export class EmailCreateComponent {
  showModal = false;
  email: Email;

  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authService.username}@angular-email.com`,
    };
  }

  composeMail() {
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe({
      next: (res) => {
        this.showModal = false;
      }
    })
  }
}
