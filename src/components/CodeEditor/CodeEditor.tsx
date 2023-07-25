import { useCodeMirror } from "./CodeEditor.hooks";
import styles from "./CodeEditor.module.scss";

import type { CodeEditorProps } from "./CodeEditor.types";

export default function CodeEditor({
  editorValue,
  updateEditorValue,
  keyMaps,
  theme,
}: CodeEditorProps) {
  const { ref } = useCodeMirror({
    theme,
    value: editorValue,
    setValue: updateEditorValue,
    keyMaps: keyMaps,
  });

  return <div ref={ref} className={styles.editor} />;
}
