
// pdStencilTutorial: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './pdstenciltutorial.core.js';
import { COMPONENTS } from './pdstenciltutorial.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
