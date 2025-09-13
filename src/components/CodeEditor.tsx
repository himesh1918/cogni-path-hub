import React from 'react';
import Editor from '@monaco-editor/react';
import { Code, Save, Settings } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  theme: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language, theme }) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="h-full border rounded-lg overflow-hidden learning-card">
      <div className="bg-card border-b px-4 py-2 text-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code size={16} />
          <span>{language.charAt(0).toUpperCase() + language.slice(1)} Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-muted rounded">
            <Save size={14} />
          </button>
          <button className="p-1 hover:bg-muted rounded">
            <Settings size={14} />
          </button>
        </div>
      </div>
      <Editor
        height="400px"
        language={language}
        theme={theme === 'vs-dark' ? 'vs-dark' : 'light'}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;