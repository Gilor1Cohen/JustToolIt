import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsService } from '../../../../Core/Services/ToolsService/tools.service';
import { ToolCategory } from '../../../../Core/Models/ToolsModel';

@Component({
  selector: 'app-tools-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './tools-categories.component.html',
  styleUrl: './tools-categories.component.css',
})
export class ToolsCategoriesComponent implements OnInit {
  toolsCategories: ToolCategory[] | null = null;
  error: any | null = null;

  constructor(private tools: ToolsService) {}

  ngOnInit(): void {
    this.tools.getToolsCategories().subscribe({
      next: (res: ToolCategory[]) => {
        this.toolsCategories = res;
      },
      error: (err: any) => {
        console.log(err);

        this.error.error = err;
      },
    });
  }

  toSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }
}
