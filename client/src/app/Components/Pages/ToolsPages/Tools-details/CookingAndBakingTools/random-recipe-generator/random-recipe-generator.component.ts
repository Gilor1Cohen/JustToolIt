import { Component, OnInit } from '@angular/core';
import {
  AreaResponse,
  HttpErrorResponseDetails,
  Meal,
  MealsResponse,
  SimpleMealRes,
} from '../../../../../../Core/Models/ToolsModel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../../../../Core/Services/Auth/auth-service.service';

@Component({
  selector: 'app-random-recipe-generator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './random-recipe-generator.component.html',
  styleUrl: './random-recipe-generator.component.css',
})
export class RandomRecipeGeneratorComponent implements OnInit {
  Categories: AreaResponse | null = null;
  CategoriesError: string | null = null;
  CategoriesLoading: boolean = false;

  Form!: FormGroup;
  FormError: string | null = null;
  FormLoading: boolean = false;
  FormData: Meal | null = null;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService,
    private auth: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Category: ['', [Validators.required]],
    });

    this.getCategories();
  }

  getCategories(): void {
    this.CategoriesLoading = true;
    this.Categories = null;

    this.tools.GetRecipesCategory().subscribe({
      next: (value: AreaResponse) => {
        this.Categories = value;
        this.CategoriesLoading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        this.CategoriesError = 'No Categories Found';
        this.CategoriesLoading = false;
      },
    });
  }

  onSubmit(): void {
    this.FormLoading = true;
    this.FormError = null;
    this.FormData = null;

    this.auth.checkUser().subscribe({
      next: (value: any) => {
        this.tools.GetRecipe(this.Form.value.Category).subscribe({
          next: (value: SimpleMealRes) => {
            this.tools
              .getDataOfRecipe(
                value.meals[Math.floor(Math.random() * value.meals.length)]
                  .idMeal
              )
              .subscribe({
                next: (value: MealsResponse) => {
                  this.FormData = value.meals[0];
                  this.auth.addFreeUserAction().subscribe({
                    next: (value: any) => {},
                    error: (err: any) => {},
                  });
                  this.FormLoading = false;
                },
                error: (err: any) => {
                  this.FormError = 'Error, Try Again';
                  this.FormLoading = false;
                },
              });
          },
          error: (err: any) => {
            this.FormError = 'Error, Try Again';
            this.FormLoading = false;
          },
        });
      },
      error: (err: HttpErrorResponseDetails) => {
        this.FormLoading = false;

        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
          return;
        }

        this.FormError = err.error.message;
      },
    });
  }

  getIngredients(meal: Meal): { ingredient: string; measure: string }[] {
    const ingredients: { ingredient: string; measure: string }[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = (meal as any)[`strIngredient${i}`];
      const measure = (meal as any)[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || '',
        });
      }
    }

    return ingredients;
  }

  hasIngredients(meal: Meal): boolean {
    return this.getIngredients(meal).length > 0;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
