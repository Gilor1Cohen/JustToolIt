import { Component, OnInit } from '@angular/core';
import {
  HistoricalFigureSearchRes,
  HttpErrorResponseDetails,
} from '../../../../../../Core/Models/ToolsModel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../../../../Core/Services/Auth/auth-service.service';

@Component({
  selector: 'app-history-tools-multi-page-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './history-tools-multi-page-component.component.html',
  styleUrl: './history-tools-multi-page-component.component.css',
})
export class HistoryToolsMultiPageComponentComponent implements OnInit {
  Loading: boolean = false;
  URL: string | null = null;
  Data: HistoricalFigureSearchRes | null = null;
  Error: string | null = null;

  Form!: FormGroup;

  constructor(
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.URL = this.router.url;
    this.FormInitialization();
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  extractToolName(path: string | null): string {
    if (!path) return '';

    const segments = path.split('/');
    const slug = segments[segments.length - 1];
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  FormInitialization(): void {
    const slug = this.URL?.split('/').pop();

    switch (slug) {
      case 'historical-figure-search':
        this.Form = this.fb.group({
          query: [null, Validators.required],
        });
        break;

      default:
        this.Form = this.fb.group({});
    }
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    const slug = this.URL?.split('/').pop();
    let request: Observable<HistoricalFigureSearchRes>;

    switch (slug) {
      case 'historical-figure-search':
        request = this.tools.historicalFigureSearch(this.Form.value);
        break;

      default:
        this.Loading = false;
        return;
    }

    this.auth.checkUser().subscribe({
      next: (value: any) => {
        request.subscribe({
          next: (value: HistoricalFigureSearchRes) => {
            this.auth.addFreeUserAction().subscribe({
              next: (value: any) => {},
              error: (err: any) => {},
            });

            this.Data = value;

            this.Loading = false;
          },
          error: (err: any) => {
            this.Error = 'An error occurred while fetching data.';
            this.Loading = false;
          },
        });
      },
      error: (err: HttpErrorResponseDetails) => {
        this.Loading = false;

        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
        }

        this.Error = err.error.message;
      },
    });
  }

  getDataEntries(): { key: string; value: any }[] {
    return this.Data
      ? Object.entries(this.Data).map(([key, value]) => ({ key, value }))
      : [];
  }

  getPages(): HistoricalFigureSearchRes['pages'] {
    return this.Data?.pages ?? [];
  }
}
