import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random-text-generator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './random-text-generator.component.html',
  styleUrl: './random-text-generator.component.css',
})
export class RandomTextGeneratorComponent implements OnInit {
  Form!: FormGroup;
  FormData: string | null = null;
  FormLoading: boolean = false;
  FormError: string | null = null;

  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Paragraphs: ['', [Validators.required, Validators.min(1)]],
      wordsPerParagraph: ['', [Validators.required, Validators.min(10)]],
    });
  }

  onSubmit(): void {
    this.FormLoading = true;
    this.FormError = null;
    this.FormData = null;

    this.tools.RandomTextGenerator(this.Form.value).subscribe({
      next: (value: string) => {
        this.FormData = value;
        this.FormLoading = false;
      },
      error: (err: any) => {
        console.log(err);

        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
        }

        this.FormError = err.error.message;
        this.FormLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
