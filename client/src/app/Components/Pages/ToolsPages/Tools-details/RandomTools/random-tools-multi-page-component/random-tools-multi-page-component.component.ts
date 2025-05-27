import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../../../Core/Services/Auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';
import { Observable } from 'rxjs';
import { HttpErrorResponseDetails } from '../../../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random-tools-multi-page-component',
  imports: [CommonModule],
  templateUrl: './random-tools-multi-page-component.component.html',
  styleUrl: './random-tools-multi-page-component.component.css',
})
export class RandomToolsMultiPageComponentComponent implements OnInit {
  Loading: boolean = false;
  URL: string | null = null;
  Data: any | null = null;
  Error: string | null = null;

  DataList: any[] = [];
  DataListSlice: any[] = [];
  typesString = '';

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

  onGenerate(): void {
    this.Loading = true;
    this.Error = null;
    this.Data = null;

    const slug = this.URL?.split('/').pop();
    let request: Observable<any>;

    switch (slug) {
      case 'random-fact':
        request = this.tools.getRandomFact();
        break;
      case 'programming-joke-generator':
        request = this.tools.getProgrammingJoke();
        break;
      case 'chuck-norris-joke-generator':
        request = this.tools.getChuckNorrisJoke();
        break;
      case 'cat-fact-generator':
        request = this.tools.getCatFact();
        break;
      case 'random-user-generator':
        request = this.tools.getRandomUser();
        break;
      case 'dog-image-generator':
        request = this.tools.getRandomDogImage();
        break;
      case 'pokemon-info-generator':
        const randomId = Math.floor(Math.random() * 898) + 1;
        request = this.tools.getPokemonInfo(randomId);
        break;
      case 'yesno-generator':
        request = this.tools.getYesNo();
        break;
      case 'kanye-quote-generator':
        request = this.tools.getKanyeQuote();
        break;
      case 'deck-of-cards-generator':
        request = this.tools.getRandomCard();
        break;
      case 'fox-image-generator':
        request = this.tools.getRandomFoxImage();
        break;

      case 'spacex-launch-generator':
        request = this.tools.getLatestLaunch();
        break;
      default:
        this.Loading = false;
        return;
    }

    this.auth.checkUser().subscribe({
      next: (value: any) => {
        request.subscribe({
          next: (value: any) => {
            this.auth.addFreeUserAction().subscribe({
              next: (value: any) => {},
              error: (err: any) => {},
            });

            this.Data = value;
            this.DataList = Array.isArray(value) ? value : [];
            this.DataListSlice = this.DataList.slice(0, 5);
            if (value.types) {
              this.typesString = value.types
                .map((t: { type: { name: string } }) => t.type.name)
                .join(', ');
            }

            this.Loading = false;
          },
          error: (err: any) => {
            console.log(err);

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

  get slug(): string | null {
    return this.URL?.split('/').pop() || null;
  }
}
