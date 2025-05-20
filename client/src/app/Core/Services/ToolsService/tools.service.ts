import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Base64Data,
  Base64SizeResult,
  getTriviaQuestionsData,
  ToolCategory,
  ToolDetails,
  TriviaCategory,
  TriviaQuestion,
  RegexTestRequest,
  BinaryCodeGeneratorReq,
  JwtTokenDecoderReq,
  RegexExplanationResult,
  NameGeneratorReq,
  ReadTimeEstimateCalculatorReq,
  QrCodeGeneratorReq,
  ReadTimeStats,
  BmiReq,
  BmiResult,
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
      `${this.Url}getTriviaQuestions/${data.category}/${data.difficulty}/${data.amount}`,
      {
        withCredentials: true,
      }
    );
  }

  Base64SizeCalc(data: Base64Data): Observable<Base64SizeResult> {
    return this.http.post<Base64SizeResult>(`${this.Url}Base64SizeCalc`, data, {
      withCredentials: true,
    });
  }

  BinaryCodeGenerator(data: BinaryCodeGeneratorReq): Observable<string> {
    return this.http.post<string>(`${this.Url}BinaryCodeGenerator`, data, {
      withCredentials: true,
    });
  }

  RegexTesterWithExplanations(
    data: RegexTestRequest
  ): Observable<RegexExplanationResult> {
    return this.http.post<RegexExplanationResult>(
      `${this.Url}RegexTesterWithExplanations`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  decodeToken(data: JwtTokenDecoderReq): Observable<any> {
    return this.http.post<any>(`${this.Url}JwtTokenDecoder`, data, {
      withCredentials: true,
    });
  }

  NameGenerator(data: NameGeneratorReq): Observable<string> {
    return this.http.post<string>(`${this.Url}NameGenerator`, data, {
      withCredentials: true,
    });
  }

  ReadTimeEstimateCalculator(
    data: ReadTimeEstimateCalculatorReq
  ): Observable<ReadTimeStats> {
    return this.http.post<ReadTimeStats>(
      `${this.Url}ReadTimeEstimateCalculator`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  QrCodeGenerator(data: QrCodeGeneratorReq): Observable<any> {
    return this.http.post<any>(`${this.Url}QrCodeGenerator`, data, {
      withCredentials: true,
    });
  }

  BmiCalculator(data: BmiReq): Observable<BmiResult> {
    return this.http.post<BmiResult>(`${this.Url}BmiCalculator`, data, {
      withCredentials: true,
    });
  }
}
