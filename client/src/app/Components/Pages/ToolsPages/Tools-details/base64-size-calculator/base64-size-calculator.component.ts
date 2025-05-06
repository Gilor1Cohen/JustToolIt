import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../Core/Services/ToolsService/tools.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Base64SizeResult,
  HttpErrorResponseDetails,
} from '../../../../../Core/Models/ToolsModel';

@Component({
  selector: 'app-base64-size-calculator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base64-size-calculator.component.html',
  styleUrl: './base64-size-calculator.component.css',
})
export class Base64SizeCalculatorComponent implements OnInit {
  Form!: FormGroup;

  Base64Size: Base64SizeResult | null = null;
  Loading: boolean = false;
  Error: string | null = null;

  constructor(private tools: ToolsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInitializing();
  }

  formInitializing(): void {
    this.Form = this.fb.group({
      base64: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;

    this.tools.Base64SizeCalc(this.Form.value).subscribe({
      next: (value: Base64SizeResult) => {
        this.Base64Size = value;
        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }
}
