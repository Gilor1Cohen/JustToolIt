import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AllChemistryResponses,
  HttpErrorResponseDetails,
  PeriodicTableLookupRes,
} from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chemistry-tools-multi-page-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chemistry-tools-multi-page-component.component.html',
  styleUrl: './chemistry-tools-multi-page-component.component.css',
})
export class ChemistryToolsMultiPageComponentComponent implements OnInit {
  Loading: boolean = false;
  URL: string | null = null;
  Data: AllChemistryResponses | null = null;
  Error: string | null = null;

  Form!: FormGroup;

  constructor(
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
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
      case 'periodic-table-lookup':
        this.Form = this.fb.group({
          query: ['', Validators.required],
        });
        break;

      case 'ideal-gas-law-solver':
        this.Form = this.fb.group({
          pressure: [null],
          volume: [null],
          moles: [null],
          temperature: [null],
        });
        break;

      case 'chemical-formula-parser':
        this.Form = this.fb.group({
          formula: ['', Validators.required],
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
    let request: Observable<AllChemistryResponses>;

    switch (slug) {
      case 'periodic-table-lookup':
        request = this.tools.periodicTableLookup(this.Form.value);
        break;

      case 'ideal-gas-law-solver':
        request = this.tools.idealGasLawSolver(this.Form.value);
        break;
      case 'chemical-formula-parser':
        request = this.tools.chemicalFormulaParser(this.Form.value);
        break;

      default:
        this.Loading = false;
        return;
    }

    request.subscribe({
      next: (value: AllChemistryResponses) => {
        this.Data = value;
        this.Loading = false;
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

  isPeriodicTableLookup(
    data: AllChemistryResponses
  ): data is PeriodicTableLookupRes {
    return 'image' in data;
  }

  isArray(value: any): value is any[] {
    return Array.isArray(value);
  }
}
