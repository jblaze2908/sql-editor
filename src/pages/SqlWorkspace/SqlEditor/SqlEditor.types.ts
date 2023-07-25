export interface SqlEditorProps {
  executeQuery: () => Promise<any>;
  editorValue: string;
  setEditorValue: (value: string) => void;
}
