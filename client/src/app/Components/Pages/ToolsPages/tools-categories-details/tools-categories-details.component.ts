import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../Core/Services/ToolsService/tools.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  HttpErrorResponseDetails,
  ToolCategory,
  ToolDetails,
} from '../../../../Core/Models/ToolsModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tools-categories-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './tools-categories-details.component.html',
  styleUrl: './tools-categories-details.component.css',
})
export class ToolsCategoriesDetailsComponent implements OnInit {
  categoryName: string | null = null;
  toolsList: ToolDetails[] | null = null;
  category: ToolCategory | null = null;
  error: string | null = null;
  loading: boolean = false;

  constructor(private tools: ToolsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
    this.toolsList = null;

    this.categoryName = this.route.snapshot.paramMap.get('category');
    if (!this.categoryName) return;

    this.tools.getToolsList(this.categoryName).subscribe({
      next: (value: ToolDetails[]) => {
        this.toolsList = value;
        console.log(value[0].endpoint);

        this.loading = false;
      },

      error: (err: HttpErrorResponseDetails) => {
        this.toolsList = null;
        this.error = err.error.message;
        this.loading = false;
      },
    });
  }
}
