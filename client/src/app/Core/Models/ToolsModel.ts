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
