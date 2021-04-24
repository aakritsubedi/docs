import { v4 as uuidV4 } from 'uuid';

import { codeEditor, textEditor } from 'assets/images';

export const products = [
  { title: 'Code Editor', link: `/code-editor/${uuidV4()}`, image: codeEditor },
  { title: 'Text Editor', link: `/text-editor/${uuidV4()}`, image: textEditor },
];
