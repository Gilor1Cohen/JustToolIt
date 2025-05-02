import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../Core/Services/ToolsService/tools.service';

@Component({
  selector: 'app-tools-categories-details',
  imports: [],
  templateUrl: './tools-categories-details.component.html',
  styleUrl: './tools-categories-details.component.css',
})
export class ToolsCategoriesDetailsComponent implements OnInit {
  toolsList: any[] | null = null;

  constructor(private tools: ToolsService) {}

  ngOnInit(): void {
    /// this.tools.getToolsList().subscribe({});
  }
}
