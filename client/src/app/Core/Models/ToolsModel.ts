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
