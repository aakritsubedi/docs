import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-jsx';
/*eslint-disable no-alert, no-console */
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css',
];

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const CodeEditor = () => {
  const codeEditor = useRef();
  const [value, setValue] = useState('//type your code here ...');
  const [mode, setMode] = useState('javascript');
  const [theme, setTheme] = useState('monokai');
  const [socket, setSocket] = useState();
  const [editorCode, setEditorCode] = useState(Math.random().toString(36).substr(2, 9));

  const onChange = (newValue, e) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log('Connecting ....');
    const s = io('http://localhost:3001');
    setSocket(s);
    console.log(codeEditor);

    return () => {
      console.log('Dis-connecting ....');
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    const handler = (delta, source) => {
      if (source !== editorCode) return;

      socket.emit('send-code-changes', {
        code: delta,
        source: source
      });
    };

    const editor = codeEditor.current.editor;
    console.log(editor);
    handler(editor.getValue(), editorCode);

    return () => {
      // quill.off('text-change', handler);
    };
  }, [socket, value]);

  useEffect(() => {
    if (socket == null || value == null) return;

    const handler = (delta) => {
      if (delta.source === editorCode) return;
      setValue(delta.code);
    };

    socket.on('receive-code-changes', handler);

    return () => {
      socket.off('receive-code-changes', handler);
    };
  }, [socket, value]);

  return (
    <div className="code-editor">
      <div className="editor-menu">
        <h3 className="title">codeEditor</h3>
        <hr />
        <div className="field">
          <label>Mode:</label>
          <p className="control">
            <span className="select">
              <select name="mode" onChange={(e) => setMode(e.target.value)} value={mode}>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </span>
          </p>
        </div>
        <div className="field">
          <label>Theme:</label>
          <p className="control">
            <span className="select">
              <select name="Theme" onChange={(e) => setTheme(e.target.value)} value={theme}>
                {themes.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </span>
          </p>
        </div>
      </div>
      <AceEditor
        mode={mode}
        theme={theme}
        onChange={onChange}
        ref={codeEditor}
        value={value}
        // name="code-editor"
        highlightActiveLine={true}
        fontSize={14}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
        editorProps={{ $blockScrolling: true }}
        name={'code-editor-' + editorCode}
      />
    </div>
  );
};

export default CodeEditor;
