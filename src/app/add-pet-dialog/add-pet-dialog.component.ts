import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-add-pet-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule
  ],
  templateUrl: './add-pet-dialog.component.html',
  styleUrl: './add-pet-dialog.component.scss'
})
export class AddPetDialogComponent {
  petForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPetDialogComponent>
  ) {
    this.dialogRef.updateSize('500px', 'auto');  // Ajusta el tamaño del diálogo

    this.petForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]]
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

