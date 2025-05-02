import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToolCategory } from '../../Models/ToolsModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private Url = 'http://localhost:4201/Tools/';

  constructor(private http: HttpClient) {}

  getToolsCategories(): Observable<ToolCategory[]> {
    return this.http.get<ToolCategory[]>(this.Url + 'GetToolsCategories');
  }

  getToolsList(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'GetToolsList');
  }
}
