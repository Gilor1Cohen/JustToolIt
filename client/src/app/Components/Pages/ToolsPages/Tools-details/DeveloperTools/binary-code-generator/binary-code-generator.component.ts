import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-binary-code-generator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './binary-code-generator.component.html',
  styleUrl: './binary-code-generator.component.css',
})
export class BinaryCodeGeneratorComponent implements OnInit {
  Form!: FormGroup;
  Loading: boolean = false;
  Error: string | null = null;
  BinaryResult: string | null = null;

  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;

    this.tools.BinaryCodeGenerator(this.Form.value).subscribe({
      next: (value: string) => {
        console.log(value);

        this.BinaryResult = value;
        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
        }

        this.Error = err.error.message;
        this.Loading = false;
      },
    });
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

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
