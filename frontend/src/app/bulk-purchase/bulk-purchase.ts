import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bulk-purchase',
  standalone: true,
  templateUrl: './bulk-purchase.html',
  styleUrls: ['./bulk-purchase.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class BulkPurchaseComponent {
  bulkForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bulkForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      organization: [''],
      bookTitle: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(10)]],
      message: ['']
    });
  }

  onSubmit() {
    if (this.bulkForm.valid) {
      console.log('Bulk Purchase Request:', this.bulkForm.value);
      alert('✅ Your bulk purchase request has been submitted!');
      this.bulkForm.reset();
    }
  }
}
