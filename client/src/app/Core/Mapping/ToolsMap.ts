import { Type } from '@angular/core';

export const toolsMap: Record<string, () => Promise<Type<any>>> = {
  'topic-trivia-quiz': () =>
    import(
      `../../Components/Pages/ToolsPages/Tools-details/trivia-quiz/trivia-quiz.component`
    ).then((m) => m.TriviaQuizComponent),
};

///   '': () => import('../../Components/Pages/ToolsPages/Tools-details/').then((m) => m.),
