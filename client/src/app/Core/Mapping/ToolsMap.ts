import { Type } from '@angular/core';

export const toolsMap: Record<string, () => Promise<Type<any>>> = {
  'topic-trivia-quiz': () =>
    import(
      `../../Components/Pages/ToolsPages/Tools-details/StudentTools/trivia-quiz/trivia-quiz.component`
    ).then((m) => m.TriviaQuizComponent),
  'base64-size-calculator': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/DeveloperTools/base64-size-calculator/base64-size-calculator.component'
    ).then((m) => m.Base64SizeCalculatorComponent),
  'binary-code-generator': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/DeveloperTools/binary-code-generator/binary-code-generator.component'
    ).then((m) => m.BinaryCodeGeneratorComponent),
  'regex-tester-with-explanations': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/DeveloperTools/regex-tester-with-explanations/regex-tester-with-explanations.component'
    ).then((m) => m.RegexTesterWithExplanationsComponent),
  'jwt-token-decoder': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/DeveloperTools/jwt-token-decoder/jwt-token-decoder.component'
    ).then((m) => m.JwtTokenDecoderComponent),
  'name-generator': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/ContentCreatorTools/name-generator/name-generator.component'
    ).then((m) => m.NameGeneratorComponent),
};

///   '': () => import('../../Components/Pages/ToolsPages/Tools-details/').then((m) => m.),
///

/// ng g c Components/Pages/ToolsPages/Tools-details/
///
