import { Type } from '@angular/core';

export const toolsMap: Record<string, () => Promise<Type<any>>> = {
  'automatic-test-generator': () =>
    import(
      '../../Components/Pages/ToolsPages/Tools-details/automatic-test-generator/automatic-test-generator.component'
    ).then((m) => m.AutomaticTestGeneratorComponent),
};
