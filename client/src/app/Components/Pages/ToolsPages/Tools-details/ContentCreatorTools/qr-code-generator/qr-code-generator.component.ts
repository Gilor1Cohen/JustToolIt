import { Component } from '@angular/core';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-code-generator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './qr-code-generator.component.html',
  styleUrl: './qr-code-generator.component.css',
})
export class QrCodeGeneratorComponent {
  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  Form!: FormGroup;
  Error: string | null = null;
  Loading: boolean = false;
  Data: any | null = null;

  ngOnInit(): void {
    this.Form = this.fb.group({ URL: ['', Validators.required] });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    this.tools.QrCodeGenerator(this.Form.value).subscribe({
      next: (value: any) => {
        this.Data = value;
        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        if (err.error.message === 'Missing token.') {
          this.router.navigateByUrl('/LogIn');
        }

        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }

  downloadQrCode(): void {
    const link = document.createElement('a');
    link.href = this.Data;
    link.download = 'qr-code.png';
    link.click();
  }
}
