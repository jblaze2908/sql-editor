import { EditorView } from "codemirror";
import { Theme } from "react-toastify";

export interface CodeEditorProps {
    editorValue: string;
    updateEditorValue: (value: string) => void;
    keyMaps:KeyMap;
    theme:Theme,
}
type KeyBindingFunction = (view: EditorView) => boolean;
interface KeyMap {
  [key: string]: KeyBindingFunction;
}
export interface UseCodeMirror {
  value: string;
  setValue: (value: string) => void;
  theme: Theme;
  keyMaps?: KeyMap;
}