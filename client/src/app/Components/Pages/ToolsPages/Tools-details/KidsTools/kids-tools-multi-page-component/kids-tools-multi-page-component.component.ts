import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Joke, UselessFact } from '../../../../../../Core/Models/ToolsModel';
import { AuthServiceService } from '../../../../../../Core/Services/Auth/auth-service.service';

@Component({
  selector: 'app-kids-tools-multi-page-component',
  imports: [CommonModule],
  templateUrl: './kids-tools-multi-page-component.component.html',
  styleUrl: './kids-tools-multi-page-component.component.css',
})
export class KidsToolsMultiPageComponentComponent implements OnInit {
  Loading: boolean = false;
  URL: string | null = null;
  Data: string | null = null;
  Error: string | null = null;

  constructor(
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.URL = this.router.url;
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

  Generate(): void {
    this.Loading = true;
    this.Data = null;

    this.auth.checkUser().subscribe({
      next: (value: any) => {
        if (this.extractToolName(this.URL) === 'Random Jokes Generator') {
          this.tools.getRandomJoke().subscribe({
            next: (value: Joke) => {
              this.Data = `${value.setup} ${value.punchline}`;
              this.auth.addFreeUserAction().subscribe({
                next: (value: any) => {},
                error: (err: any) => {},
              });
              this.Loading = false;
            },
            error: (err: any) => {
              this.Error = 'An error occurred while fetching data.';
              this.Loading = false;
            },
          });
        } else {
          this.tools.getFauxFact().subscribe({
            next: (value: UselessFact) => {
              this.Data = value.text;
              this.auth.addFreeUserAction().subscribe({
                next: (value: any) => {},
                error: (err: any) => {},
              });
              this.Loading = false;
            },
            error: (err: any) => {
              this.Error = 'An error occurred while fetching data.';
              this.Loading = false;
            },
          });
        }
        this.Loading = false;
      },
      error: (err: any) => {
        if (err.error.message === 'Missing token.') {
          const currentUrl = this.router.url;
          this.router.navigate(['/LogIn'], {
            queryParams: { returnUrl: currentUrl },
          });
          return;
        }
        this.Error = err.error.message;
        this.Loading = false;
      },
    });
  }
}
