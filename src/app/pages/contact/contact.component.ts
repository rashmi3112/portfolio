import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    CommonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackbar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    if (this.contactForm.invalid) return;

    this.isLoading = true;

    const formData = this.contactForm.value;

    this.http.post('https://localhost:7172/api/contact/send', formData).subscribe({
      next: () => {
        this.showAlert('Mail sent successfully!.', 'success');
        this.contactForm.reset();
      },
      error: () => {
        this.showAlert('Something went wrong. Please try again.', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  //for showing alerts
  private showAlert(message: string, type: 'success' | 'error') {
    this.snackbar.open(message, 'Close', {
      duration: 5000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}
