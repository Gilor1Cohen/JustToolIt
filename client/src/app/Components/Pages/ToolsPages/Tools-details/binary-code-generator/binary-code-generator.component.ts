import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-binary-code-generator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './binary-code-generator.component.html',
  styleUrl: './binary-code-generator.component.css',
})
export class BinaryCodeGeneratorComponent implements OnInit {
  Form!: FormGroup;

  BinaryResult: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      text: ['', [Validators.required]],
    });

    this.Form.get('text')?.valueChanges.subscribe((value) => {
      this.BinaryResult = this.convertToBinary(value);
    });
  }

  convertToBinary(text: string): string {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  }

  copyToClipboard(): void {
    const text = this.BinaryResult;
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
