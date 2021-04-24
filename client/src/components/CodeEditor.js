import React, { useState } from 'react';
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

const defaultValue = `function onLoad(editor) {
  console.log("i've loaded");
}`;

const CodeEditor = () => {
  const [value, setValue] = useState('//type your code here ...');

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const [mode, setMode] = useState('javascript');
  const [theme, setTheme] = useState('monokai');

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
        value={value}
        name="code-editor"
        highlightActiveLine={true}
        fontSize={14}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default CodeEditor;
