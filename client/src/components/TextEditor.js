import React, { useCallback } from 'react';

import Quill from 'quill';

import 'quill/dist/quill.snow.css';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ scripts: 'sub' }, { scripts: 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ size: [ 'small', false, 'large', 'huge' ]}],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

const TextEditor = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
  }, []);

  return <div className="editor" ref={wrapperRef}></div>;
};

export default TextEditor;
