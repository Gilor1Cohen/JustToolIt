import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-name-generator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './name-generator.component.html',
  styleUrl: './name-generator.component.css',
})
export class NameGeneratorComponent implements OnInit {
  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  Form!: FormGroup;
  Error: string | null = null;
  Loading: boolean = false;
  Data: string | null = null;

  ngOnInit(): void {
    this.Form = this.fb.group({ typeOfName: ['', Validators.required] });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    this.tools.NameGenerator(this.Form.value).subscribe({
      next: (value: string) => {
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
