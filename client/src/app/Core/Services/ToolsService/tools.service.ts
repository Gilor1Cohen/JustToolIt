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
  UselessFact,
  Joke,
  DistanceSpeedTimeReq,
  AccelerationReq,
  KinematicMotionReq,
  FreeFallReq,
  ForceReq,
  WorkEnergyReq,
  KineticPotentialEnergyReq,
  TorqueReq,
  HeatTransferReq,
  RadioactiveHalfLifeReq,
  PhotonEnergyReq,
  DistanceSpeedTimeRes,
  AccelerationRes,
  KinematicMotionRes,
  FreeFallRes,
  ForceRes,
  WorkAndEnergyRes,
  KineticPotentialEnergyRes,
  TorqueRes,
  HeatTransferRes,
  RadioactiveHalfLifeRes,
  PhotonEnergyRes,
  MassVsWeightReq,
  EscapeVelocityReq,
  EscapeVelocityRes,
  MassVsWeightRes,
  PeriodicTableLookupReq,
  PeriodicTableLookupRes,
  IdealGasLawSolverReq,
  IdealGasLawSolverRes,
  ChemicalFormulaParserReq,
  ChemicalFormulaParserRes,
  HistoricalFigureSearchReq,
  HistoricalFigureSearchRes,
  RandomFact,
  ChuckNorrisJoke,
  CatFact,
  RandomUserResponse,
  DogImageResponse,
  Pokemon,
  YesNoResponse,
  KanyeQuote,
  CardDraw,
  FoxImage,
  Launch,
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

  getRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(
      'https://official-joke-api.appspot.com/jokes/random'
    );
  }

  getFauxFact(): Observable<UselessFact> {
    return this.http.get<UselessFact>(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
  }

  computeDistanceSpeedTime(
    data: DistanceSpeedTimeReq
  ): Observable<DistanceSpeedTimeRes> {
    return this.http.post<DistanceSpeedTimeRes>(
      `${this.Url}computeDistanceSpeedTime`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateAcceleration(data: AccelerationReq): Observable<AccelerationRes> {
    return this.http.post<AccelerationRes>(
      `${this.Url}calculateAcceleration`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  solveKinematicMotion(
    data: KinematicMotionReq
  ): Observable<KinematicMotionRes> {
    return this.http.post<KinematicMotionRes>(
      `${this.Url}solveKinematicMotion`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateFreeFall(data: FreeFallReq): Observable<FreeFallRes> {
    return this.http.post<FreeFallRes>(`${this.Url}calculateFreeFall`, data, {
      withCredentials: true,
    });
  }

  calculateForce(data: ForceReq): Observable<ForceRes> {
    return this.http.post<ForceRes>(`${this.Url}calculateForce`, data, {
      withCredentials: true,
    });
  }

  calculateWorkAndEnergy(data: WorkEnergyReq): Observable<WorkAndEnergyRes> {
    return this.http.post<WorkAndEnergyRes>(
      `${this.Url}calculateWorkAndEnergy`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateKineticPotentialEnergy(
    data: KineticPotentialEnergyReq
  ): Observable<KineticPotentialEnergyRes> {
    return this.http.post<KineticPotentialEnergyRes>(
      `${this.Url}calculateKineticPotentialEnergy`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateTorque(data: TorqueReq): Observable<TorqueRes> {
    return this.http.post<TorqueRes>(`${this.Url}calculateTorque`, data, {
      withCredentials: true,
    });
  }

  calculateHeatTransfer(data: HeatTransferReq): Observable<HeatTransferRes> {
    return this.http.post<HeatTransferRes>(
      `${this.Url}calculateHeatTransfer`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateRadioactiveHalfLife(
    data: RadioactiveHalfLifeReq
  ): Observable<RadioactiveHalfLifeRes> {
    return this.http.post<RadioactiveHalfLifeRes>(
      `${this.Url}calculateRadioactiveHalfLife`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculatePhotonEnergy(data: PhotonEnergyReq): Observable<PhotonEnergyRes> {
    return this.http.post<PhotonEnergyRes>(
      `${this.Url}calculatePhotonEnergy`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateMassVsWeight(data: MassVsWeightReq): Observable<MassVsWeightRes> {
    return this.http.post<MassVsWeightRes>(
      `${this.Url}calculateMassVsWeight`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  calculateEscapeVelocity(
    data: EscapeVelocityReq
  ): Observable<EscapeVelocityRes> {
    return this.http.post<EscapeVelocityRes>(
      `${this.Url}calculateEscapeVelocity`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  periodicTableLookup(
    data: PeriodicTableLookupReq
  ): Observable<PeriodicTableLookupRes> {
    return this.http.post<PeriodicTableLookupRes>(
      `${this.Url}periodicTableLookup`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  idealGasLawSolver(
    data: IdealGasLawSolverReq
  ): Observable<IdealGasLawSolverRes> {
    return this.http.post<IdealGasLawSolverRes>(
      `${this.Url}idealGasLawSolver`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  chemicalFormulaParser(
    data: ChemicalFormulaParserReq
  ): Observable<ChemicalFormulaParserRes> {
    return this.http.post<ChemicalFormulaParserRes>(
      `${this.Url}chemicalFormulaParser`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  historicalFigureSearch(
    data: HistoricalFigureSearchReq
  ): Observable<HistoricalFigureSearchRes> {
    return this.http.get<HistoricalFigureSearchRes>(
      `https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${encodeURIComponent(
        data.query
      )}&limit=10`
    );
  }

  getRandomFact(): Observable<RandomFact> {
    return this.http.get<RandomFact>(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
  }

  getProgrammingJoke(): Observable<Joke[]> {
    return this.http.get<Joke[]>(
      'https://official-joke-api.appspot.com/jokes/programming/random'
    );
  }

  getChuckNorrisJoke(): Observable<ChuckNorrisJoke> {
    return this.http.get<ChuckNorrisJoke>(
      'https://api.chucknorris.io/jokes/random'
    );
  }

  getCatFact(): Observable<CatFact> {
    return this.http.get<CatFact>('https://catfact.ninja/fact');
  }

  getRandomUser(): Observable<RandomUserResponse> {
    return this.http.get<RandomUserResponse>('https://randomuser.me/api/');
  }

  getRandomDogImage(): Observable<DogImageResponse> {
    return this.http.get<DogImageResponse>(
      'https://dog.ceo/api/breeds/image/random'
    );
  }

  getPokemonInfo(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    );
  }

  getYesNo(): Observable<YesNoResponse> {
    return this.http.get<YesNoResponse>('https://yesno.wtf/api');
  }

  getKanyeQuote(): Observable<KanyeQuote> {
    return this.http.get<KanyeQuote>('https://api.kanye.rest/');
  }

  getRandomCard(): Observable<CardDraw> {
    return this.http.get<CardDraw>(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=1'
    );
  }

  getRandomFoxImage(): Observable<FoxImage> {
    return this.http.get<FoxImage>('https://randomfox.ca/floof/');
  }

  getLatestLaunch(): Observable<Launch> {
    return this.http.get<Launch>(
      'https://api.spacexdata.com/v4/launches/latest'
    );
  }
}
