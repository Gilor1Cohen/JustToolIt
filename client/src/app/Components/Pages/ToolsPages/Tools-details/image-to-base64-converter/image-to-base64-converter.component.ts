import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-to-base64-converter',
  imports: [CommonModule],
  templateUrl: './image-to-base64-converter.component.html',
  styleUrl: './image-to-base64-converter.component.css',
})
export class ImageToBase64ConverterComponent implements OnInit {
  Form!: FormGroup;
  FormLoading: boolean = false;
  FormError: string | null = null;
  Base64String: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      file: [null],
    });
  }

  onFileSelected(event: Event): void {
    this.FormError = null;
    this.Base64String = null;
    this.FormLoading = true;

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.FormError = 'No file selected.';
      return;
    }

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.FormError = 'Invalid file type. Please select an image.';
      return;
    }

    this.Form.patchValue({ file });
    this.Form.get('file')!.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.Base64String = reader.result as string;
      this.FormLoading = false;
    };
    reader.onerror = () => {
      this.FormLoading = false;
      this.FormError = 'Error reading file.';
    };
    reader.readAsDataURL(file);
  }

  copyToClipboard(): void {
    const text = this.Base64String;
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy.');
      });
  }
}
