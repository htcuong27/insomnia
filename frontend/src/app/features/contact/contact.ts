import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  submitted = false;
  sending = false;
  error = '';

  onSubmit() {
    if (this.contactForm.valid) {
      this.sending = true;
      this.error = '';

      this.contactService.submitContact(this.contactForm.value as any).subscribe({
        next: () => {
          this.submitted = true;
          this.sending = false;
        },
        error: (error: unknown) => {
          this.error = 'Failed to send message. Please try again.';
          this.sending = false;
          console.error('Error submitting contact form:', error);
        },
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.contactForm.reset();
  }
}
