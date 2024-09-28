import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-pet-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-pet-dialog.component.html',
  styleUrl: './edit-pet-dialog.component.scss'
})
export class EditPetDialogComponent {
  petForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.petForm = this.fb.group({
      name: [data.name, Validators.required],
      species: [data.species, Validators.required],
      breed: [data.breed, Validators.required],
      age: [data.age, [Validators.required, Validators.min(0)]],
      weight: [data.weight, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      this.dialogRef.close(this.petForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
