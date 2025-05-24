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
  WaterIntakeReq,
  DailyCalorieReq,
  AreaResponse,
  SimpleMealRes,
  TemperatureAndUnitsConversionReq,
  DailyPrayerTimesReq,
  DailyPrayerTimesRes,
  LocationRes,
  RandomTextGeneratorReq,
  SunriseSunsetRes,
  CoolTextConverterReq,
  CoolTextConvertedRes,
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

  DailyWaterIntakeCalculator(data: WaterIntakeReq): Observable<number> {
    return this.http.post<number>(
      `${this.Url}DailyWaterIntakeCalculator`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  DailyCalorieCalculator(data: DailyCalorieReq): Observable<number> {
    return this.http.post<number>(`${this.Url}DailyCalorieCalculator`, data, {
      withCredentials: true,
    });
  }

  BodyFatPercentageCalculator(data: DailyCalorieReq): Observable<number> {
    return this.http.post<number>(
      `${this.Url}BodyFatPercentageCalculator`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  GetRecipesCategory(): Observable<AreaResponse> {
    return this.http.get<AreaResponse>(
      'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    );
  }

  GetRecipe(Category: string): Observable<SimpleMealRes> {
    return this.http.get<SimpleMealRes>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Category}`
    );
  }

  getDataOfRecipe(idMeal: string): Observable<any> {
    return this.http.get<any>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
  }

  TemperatureConverter(
    data: TemperatureAndUnitsConversionReq
  ): Observable<number> {
    return this.http.post<number>(`${this.Url}TemperatureConverter`, data, {
      withCredentials: true,
    });
  }

  UnitsConverter(data: TemperatureAndUnitsConversionReq): Observable<any> {
    return this.http.post<any>(`${this.Url}UnitsConverter`, data, {
      withCredentials: true,
    });
  }

  DailyPrayerTimes(data: DailyPrayerTimesReq): Observable<DailyPrayerTimesRes> {
    return this.http.get<DailyPrayerTimesRes>(
      `http://api.aladhan.com/v1/timingsByCity?city=${data.City}&country=${data.Country}&method=3`
    );
  }

  GetLoc(data: DailyPrayerTimesReq): Observable<LocationRes[]> {
    return this.http.get<LocationRes[]>(
      `https://nominatim.openstreetmap.org/search?city=${data.City}&country=${data.Country}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'JustToolIt',
        },
      }
    );
  }

  GetSunset(
    lat: string | number,
    lon: string | number,
    date: string
  ): Observable<SunriseSunsetRes> {
    return this.http.get<SunriseSunsetRes>(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}&formatted=0`
    );
  }

  RandomTextGenerator(data: RandomTextGeneratorReq): Observable<string> {
    return this.http.post<string>(`${this.Url}RandomTextGenerator`, data, {
      withCredentials: true,
    });
  }

  CoolTextConverter(
    data: CoolTextConverterReq
  ): Observable<CoolTextConvertedRes> {
    return this.http.post<CoolTextConvertedRes>(
      `${this.Url}CoolTextConverter`,
      data,
      {
        withCredentials: true,
      }
    );
  }
}
