import { Type } from '@angular/core';

export const toolsMap: Record<string, () => Promise<Type<any>>> = {
  'topic-trivia-quiz': () =>
    import(
      `../../Components/Pages/ToolsPages/Tools-details/trivia-quiz/trivia-quiz.component`
    ).then((m) => m.TriviaQuizComponent),
  'base64-size-calculator': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/base64-size-calculator/base64-size-calculator.component'
    ).then((m) => m.Base64SizeCalculatorComponent),
  'binary-code-generator': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/binary-code-generator/binary-code-generator.component'
    ).then((m) => m.BinaryCodeGeneratorComponent),
  'regex-tester-with-explanations': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/regex-tester-with-explanations/regex-tester-with-explanations.component'
    ).then((m) => m.RegexTesterWithExplanationsComponent),
  'jwt-token-decoder': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/jwt-token-decoder/jwt-token-decoder.component'
    ).then((m) => m.JwtTokenDecoderComponent),
  'image-to-base64-converter': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/image-to-base64-converter/image-to-base64-converter.component'
    ).then((m) => m.ImageToBase64ConverterComponent),
};

///   '': () => import('../../Components/Pages/ToolsPages/Tools-details/').then((m) => m.),
///

/// ng g c Components/Pages/ToolsPages/Tools-details/
///
