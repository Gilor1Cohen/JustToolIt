import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import {
  HttpErrorResponseDetails,
  TriviaCategory,
  TriviaQuestion,
} from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trivia-quiz',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trivia-quiz.component.html',
  styleUrl: './trivia-quiz.component.css',
})
export class TriviaQuizComponent implements OnInit {
  categories: TriviaCategory[] | null = null;
  categoriesError: string | null = null;
  categoriesLoading: boolean = false;

  Form!: FormGroup;
  FormError: string | null = null;
  FormLoading: boolean = false;
  FormData: TriviaQuestion[] | null = null;

  questionsPerPage = 10;
  currentPage = 1;

  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesLoading = true;
    this.formInitializing();
    this.getCategories();
  }

  getCategories(): void {
    this.tools.getTriviaCategories().subscribe({
      next: (value: TriviaCategory[]) => {
        this.categories = value;
        this.categoriesLoading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        this.categoriesError = err.error.message;
        this.categoriesLoading = false;
      },
    });
  }

  formInitializing(): void {
    this.Form = this.fb.group({
      category: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      amount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(49)],
      ],
    });
  }

  onSubmit(): void {
    this.questionsPerPage = 10;
    this.currentPage = 1;

    this.FormLoading = true;
    this.FormError = null;

    this.tools.getTriviaQuestions(this.Form.value).subscribe({
      next: (value: TriviaQuestion[]) => {
        console.log(value);

        this.FormLoading = false;
        this.FormData = value;
      },
      error: (err: HttpErrorResponseDetails) => {
        this.FormLoading = false;

        if (err.error.message === 'Missing token.') {
          this.router.navigateByUrl('/LogIn');
        }
        this.FormError = err.error.message;
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.FormData!.length / this.questionsPerPage);
  }

  getCurrentPageQuestions() {
    const start = (this.currentPage - 1) * this.questionsPerPage;
    const end = start + this.questionsPerPage;
    return this.FormData!.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
