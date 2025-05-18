import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { RegexExplanationResult } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regex-tester-with-explanations',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './regex-tester-with-explanations.component.html',
  styleUrl: './regex-tester-with-explanations.component.css',
})
export class RegexTesterWithExplanationsComponent implements OnInit {
  Form!: FormGroup;
  FormData: RegexExplanationResult | null = null;
  FormLoading: boolean = false;
  FormError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      pattern: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.FormLoading = true;
    this.FormError = null;
    this.FormData = null;

    this.tools.RegexTesterWithExplanations(this.Form.value).subscribe({
      next: (value: RegexExplanationResult) => {
        this.FormData = value;
        this.FormLoading = false;
      },
      error: (err: any) => {
        if (err.error.message === 'Missing token.') {
          this.router.navigateByUrl('/LogIn');
        }

        this.FormError = err.error.message;
        this.FormLoading = false;
      },
    });
  }
}
