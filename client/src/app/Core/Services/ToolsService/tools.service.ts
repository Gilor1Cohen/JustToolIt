import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getTriviaQuestionsData,
  ToolCategory,
  ToolDetails,
  TriviaCategory,
  TriviaQuestion,
} from '../../Models/ToolsModel';
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

  getToolsList(name: string): Observable<ToolDetails[]> {
    return this.http.get<ToolDetails[]>(this.Url + 'GetToolsList/' + name);
  }

  getTriviaCategories(): Observable<TriviaCategory[]> {
    return this.http.get<TriviaCategory[]>(this.Url + 'getTriviaCategories');
  }

  getTriviaQuestions(
    data: getTriviaQuestionsData
  ): Observable<TriviaQuestion[]> {
    return this.http.get<TriviaQuestion[]>(
      `${this.Url}getTriviaQuestions/${data.category}/${data.difficulty}/${data.amount}`
    );
  }
}
