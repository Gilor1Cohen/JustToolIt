import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-converter-ingredients',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './unit-converter-ingredients.component.html',
  styleUrl: './unit-converter-ingredients.component.css',
})
export class UnitConverterIngredientsComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: any | null = null;

  Form!: FormGroup;

  Units: string[] = ['tsp', 'tbsp', 'cup', 'ml', 'g'];
  Ingredients: string[] = ['water', 'sugar', 'flour', 'oil', 'honey', 'milk'];

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Value: ['', Validators.required],
      FromUnit: ['', Validators.required],
      ToUnit: ['', Validators.required],
      Ingredient: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    this.tools.UnitsConverter(this.Form.value).subscribe({
      next: (value: any) => {
        this.Data = value;
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

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
