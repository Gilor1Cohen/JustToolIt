export interface ToolCategory {
  id: number;
  name: string;
  image_url: string;
}

export interface ToolDetails {
  id: number;
  name: string;
  description: string;
  category_id: number;
  endpoint: string;
}

export interface HttpErrorResponseDetails {
  headers: {
    normalizedNames: { [key: string]: any };
    lazyUpdate: null;
  };
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: {
    message: string;
    [key: string]: any;
  };
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface getTriviaQuestionsData {
  category: number;
  difficulty: string;
  amount: number;
}

export interface TriviaQuestion {
  value: string;
  category: {
    id: number;
    name: string;
  };
  type: 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[];
}

export interface Base64Data {
  base64: string;
}

export interface Base64SizeResult {
  bytes: number;
  kilobytes: number;
}

export interface BinaryCodeGeneratorReq {
  text: string;
}

export interface BinaryCodeGeneratorRes {}

export interface RegexTestRequest {
  pattern: string;
}

export interface RegexExplanationResult {
  pattern: string;
  explanationCount: number;
  explanations: RegexTokenExplanation[];
}

interface RegexTokenExplanation {
  token: string;
  explanation: string;
  category: string;
}

export interface JwtTokenDecoderReq {
  token: string;
}

export interface NameGeneratorReq {
  typeOfName: string;
}

export interface ReadTimeEstimateCalculatorReq {
  Text: string;
}

export interface ReadTimeStats {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface QrCodeGeneratorReq {
  URL: string;
}

export interface BmiReq {
  Weight: number;
  Height: number;
  Age: number;
  Gender: 'male' | 'female';
}

export interface BmiResult {
  BMI: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight';
}

export interface WaterIntakeReq {
  Weight: number;
  activityLevel: 'low' | 'moderate' | 'high';
  climate: 'cold' | 'moderate' | 'hot';
}

export interface DailyCalorieReq {
  Weight: number;
  Height: number;
  Age: number;
  ActivityLevel: '0' | '1' | '2' | '3' | '4';
  Gender: 'male' | 'female';
}

export interface Area {
  strArea: string;
}

export interface AreaResponse {
  meals: Area[];
}

export interface SimpleMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface SimpleMealRes {
  meals: SimpleMeal[];
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface MealsResponse {
  meals: Meal[];
}

export interface TemperatureAndUnitsConversionReq {
  Value: number;
  FromUnit: string;
  ToUnit: string;
  Ingredient?: string;
}

export interface DailyPrayerTimesReq {
  City: string;
  Country: string;
}

export interface DailyPrayerTimesRes {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
      Firstthird: string;
      Lastthird: string;
    };
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string; days: number };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
        adjustedHolidays: string[];
        method: string;
      };
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
        lunarSighting: boolean;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: { Fajr: number; Isha: number };
        location: { latitude: number; longitude: number };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: {
        Imsak: number;
        Fajr: number;
        Sunrise: number;
        Dhuhr: number;
        Asr: number;
        Maghrib: number;
        Sunset: number;
        Isha: number;
        Midnight: number;
      };
    };
  };
}

export interface LocationRes {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
}

export interface SunriseSunsetRes {
  results: {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: number;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
  };
  status: string;
  tzid?: string;
}

export interface RandomTextGeneratorReq {
  Paragraphs: number | string;
  wordsPerParagraph: number | string;
}

export interface CoolTextConverterReq {
  Text: string;
}

export interface CoolTextConvertedRes {
  original: string;
  smallCaps: string;
  circled: string;
  ascii: string;
  fancyBold: string;
  fancyItalic: string;
  fancyMono: string;
}

export interface UselessFact {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}

export interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export interface DistanceSpeedTimeReq {
  distance: number | null;
  speed: number | null;
  time: number | null;
}

export interface AccelerationReq {
  initialVelocity: number | null;
  finalVelocity: number | null;
  time: number | null;
}

export interface KinematicMotionReq {
  initialVelocity: number | null;
  acceleration: number | null;
  time: number | null;
}

export interface FreeFallReq {
  height: number | null;
  time: number | null;
  impactSpeed: number | null;
}

export interface ForceReq {
  mass: number | null;
  acceleration: number | null;
}

export interface WorkEnergyReq {
  force: number | null;
  displacement: number | null;
}

export interface KineticPotentialEnergyReq {
  mass: number | null;
  velocity?: number | null;
  height?: number | null;
}

export interface TorqueReq {
  force: number | null;
  distance: number | null;
}

export interface HeatTransferReq {
  mass: number | null;
  specificHeat: number | null;
  temperatureChange: number | null;
}

export interface RadioactiveHalfLifeReq {
  initialMass: number | null;
  halfLife: number | null;
  time: number | null;
}

export interface PhotonEnergyReq {
  wavelength?: number | null;
  frequency?: number | null;
}

export interface DistanceSpeedTimeRes {
  distance?: number;
  speed?: number;
  time?: number;
}

export interface AccelerationRes {
  acceleration: number;
}

export interface KinematicMotionRes {
  finalVelocity: number;
  displacement: number;
}

export interface FreeFallRes {
  height?: number;
  time?: number;
  impactSpeed?: number;
}

export interface ForceRes {
  force: number;
}

export interface WorkAndEnergyRes {
  work: number;
}

export interface KineticPotentialEnergyRes {
  kineticEnergy?: number;
  potentialEnergy?: number;
}

export interface TorqueRes {
  torque: number;
}

export interface HeatTransferRes {
  heat: number;
}

export interface RadioactiveHalfLifeRes {
  remainingMass: number;
}

export interface PhotonEnergyRes {
  energy: number;
}

export type AllPhysicsResponses =
  | DistanceSpeedTimeRes
  | AccelerationRes
  | KinematicMotionRes
  | FreeFallRes
  | ForceRes
  | WorkAndEnergyRes
  | KineticPotentialEnergyRes
  | TorqueRes
  | HeatTransferRes
  | RadioactiveHalfLifeRes
  | PhotonEnergyRes;

export interface MassVsWeightReq {
  mass: number;
  gravity: number;
}

export interface MassVsWeightRes {
  weight: number;
}

export interface EscapeVelocityReq {
  mass: number;
  radius: number;
}

export interface EscapeVelocityRes {
  escapeVelocity: number;
}

export type AllAstronomyResponses = MassVsWeightRes | EscapeVelocityRes;

export interface PeriodicTableLookupReq {
  query: string | number;
}

export interface PeriodicTableLookupRes {
  name: string;
  symbol: string;
  number: number;
  atomic_mass: number;
  appearance: string | null;
  boil: number | null;
  category: string;
  density: number | null;
  discovered_by: string | null;
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  period: number;
  group: number;
  phase: string;
  source: string;
  bohr_model_image: string | null;
  bohr_model_3d: string | null;
  spectral_img: string | null;
  summary: string;
  xpos: number;
  ypos: number;
  wxpos: number;
  wypos: number;
  shells: number[];
  electron_configuration: string;
  electron_configuration_semantic: string;
  electron_affinity: number | null;
  electronegativity_pauling: number | null;
  ionization_energies: number[];
  block: string;
  image: {
    title: string;
    url: string;
    attribution: string;
  };
}

export interface IdealGasLawSolverReq {
  pressure: number;
  volume: number;
  moles: number;
  temperature: number;
}

export interface IdealGasLawSolverRes {
  pressure: number;
  volume: number;
  moles: number;
  temperature: number;
  missing: 'pressure' | 'volume' | 'moles' | 'temperature';
}

export interface ChemicalFormulaParserReq {
  formula: string;
}

export interface ChemicalFormulaParserRes {
  [element: string]: number;
}

export type AllChemistryResponses =
  | PeriodicTableLookupRes
  | IdealGasLawSolverRes
  | ChemicalFormulaParserRes;

export interface HistoricalFigureSearchReq {
  query: string;
}

export interface HistoricalFigureSearchRes {
  pages: Array<{
    id: number;
    key: string;
    title: string;
    excerpt: string;
    matched_title: string | null;
    description?: string;
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
  }>;
}

export interface RandomFact {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}

export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export interface ChuckNorrisJoke {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

export interface CatFact {
  fact: string;
  length: number;
}

export interface RandomUserResponse {
  results: Array<{
    gender: string;
    name: { title: string; first: string; last: string };
    email: string;
    picture: { large: string; medium: string; thumbnail: string };
  }>;
  info: { seed: string; results: number; page: number; version: string };
}

export interface DogImageResponse {
  message: string;
  status: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  sprites: { front_default: string };
}

export interface YesNoResponse {
  answer: string;
  forced: boolean;
  image: string;
}

export interface KanyeQuote {
  quote: string;
}

export interface CardDraw {
  success: boolean;
  deck_id: string;
  cards: Array<{
    code: string;
    image: string;
    suit: string;
    value: string;
  }>;
  remaining: number;
}

export interface FoxImage {
  image: string;
  link: string;
}

export interface Launch {
  fairings: any;
  links: {
    patch: { small: string; large: string };
    webcast: string;
    youtube_id: string;
    wikipedia: string;
  };
  rocket: string;
  success: boolean;
  details: string;
  date_utc: string;
}

export interface ProbabilityCalculatorReq {
  mode: 'combination' | 'permutation';
  n: number;
  r: number;
  successfulEvents: number;
}

export interface ProbabilityCalculatorRes {
  totalOutcomes: number;
  probability: number;
}

export interface PrimeNumberCheckerRes {
  isPrime: boolean;
  factors: number[];
  closestPrime?: number;
}
