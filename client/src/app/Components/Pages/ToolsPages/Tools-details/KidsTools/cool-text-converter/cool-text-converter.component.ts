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
import { CoolTextConvertedRes } from '../../../../../../Core/Models/ToolsModel';

@Component({
  selector: 'app-cool-text-converter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cool-text-converter.component.html',
  styleUrl: './cool-text-converter.component.css',
})
export class CoolTextConverterComponent implements OnInit {
  Form!: FormGroup;
  FormLoading: boolean = false;
  Data: CoolTextConvertedRes | null = null;
  ErrorMessage: string | null = null;

  constructor(
    private tools: ToolsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      Text: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.Data = null;
    this.ErrorMessage = null;
    this.FormLoading = true;

    this.tools.CoolTextConverter(this.Form.value).subscribe({
      next: (value: CoolTextConvertedRes) => {
        this.Data = value;
        this.FormLoading = false;
      },
      error: (err: any) => {
        this.ErrorMessage = err.error.error;
        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
        }

        this.FormLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
