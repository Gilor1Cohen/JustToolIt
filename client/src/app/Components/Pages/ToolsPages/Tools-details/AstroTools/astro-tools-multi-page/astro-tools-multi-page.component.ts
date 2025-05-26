import { Component, OnInit } from '@angular/core';
import {
  AllAstronomyResponses,
  HttpErrorResponseDetails,
} from '../../../../../../Core/Models/ToolsModel';
import { Observable } from 'rxjs';
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
  selector: 'app-astronomy-and-astrophysics-tools-multi-page-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './astro-tools-multi-page.component.html',
  styleUrl: './astro-tools-multi-page.component.css',
})
export class AstronomyAndAstrophysicsToolsMultiPageComponentComponent
  implements OnInit
{
  Loading: boolean = false;
  URL: string | null = null;
  Data: AllAstronomyResponses | null = null;
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
      case 'mass-vs-weight-calculator':
        this.Form = this.fb.group({
          mass: [null, Validators.required],
          gravity: [null, Validators.required],
        });
        break;

      case 'escape-velocity-calculator':
        this.Form = this.fb.group({
          mass: [null, Validators.required],
          radius: [null, Validators.required],
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
    let request: Observable<AllAstronomyResponses>;

    switch (slug) {
      case 'mass-vs-weight-calculator':
        request = this.tools.calculateMassVsWeight(this.Form.value);
        break;

      case 'escape-velocity-calculator':
        request = this.tools.calculateEscapeVelocity(this.Form.value);
        break;

      default:
        this.Loading = false;
        return;
    }

    request.subscribe({
      next: (value: AllAstronomyResponses) => {
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
}
