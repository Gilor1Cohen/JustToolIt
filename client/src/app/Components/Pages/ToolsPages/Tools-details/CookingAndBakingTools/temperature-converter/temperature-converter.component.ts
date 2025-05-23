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
  selector: 'app-temperature-converter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './temperature-converter.component.html',
  styleUrl: './temperature-converter.component.css',
})
export class TemperatureConverterComponent implements OnInit {
  Error: string | null = null;
  Loading: boolean = false;
  Data: number | null = null;

  Form!: FormGroup;

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
    });
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    this.tools.TemperatureConverter(this.Form.value).subscribe({
      next: (value: number) => {
        this.Data = value;

        this.Loading = false;
      },
      error: (err: HttpErrorResponseDetails) => {
        console.log(err);

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
