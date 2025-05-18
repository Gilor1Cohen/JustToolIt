import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../../../Core/Services/ToolsService/tools.service';

@Component({
  selector: 'app-name-generator',
  imports: [],
  templateUrl: './name-generator.component.html',
  styleUrl: './name-generator.component.css',
})
export class NameGeneratorComponent implements OnInit {
  constructor(private tools: ToolsService) {}

  ngOnInit(): void {}
}
