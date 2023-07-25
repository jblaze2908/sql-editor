/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EditorView, basicSetup } from "codemirror";
import { sql, MySQL } from "@codemirror/lang-sql";
import { keymap } from "@codemirror/view";
// import { dracula } from "@uiw/codemirror-theme-dracula";
import { useEffect, useRef } from "react";
import { UseCodeMirror } from "./CodeEditor.types";
import darkModeTheme from "./theme/darkModeTheme";
// import lightModeTheme from "./theme/lightModeTheme";

export function useCodeMirror({
  value,
  setValue,
  keyMaps = {},
  theme,
}: UseCodeMirror) {
  const ref = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);
  const view = useRef<EditorView | null>(null);
  useEffect(() => {
    if (ref.current && !view.current) {
      view.current = new EditorView({
        doc: value,
        // @ts-expect-error
        extensions: [
          basicSetup,
          theme === "light" ? null : darkModeTheme,
          keymap.of(
            Object.keys(keyMaps).map((key) => ({
              key,
              run: keyMaps[key],
            }))
          ),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setValue(update.state.doc.toString());
            }
          }),
          sql({
            dialect: MySQL,
          }),
        ].filter((item) => item),
        parent: ref.current,
      });
      hasMounted.current = true;
    }
    return () => {
      view.current?.destroy();
      view.current = null;
    };
  }, [keyMaps, theme]);

  // this useEffect is used to update the value of the editor when the value prop changes
  useEffect(() => {
    if (view.current) {
      const cmValue = view.current.state.doc.toString();
      if (cmValue !== value) {
        const cursorPos = view.current.state.selection.main.head;
        view.current.dispatch({
          changes: {
            from: 0,
            to: view.current.state.doc.length,
            insert: value,
          },
        });
        if (value !== "")
          view.current.dispatch({
            selection: { anchor: cursorPos, head: cursorPos },
          });
      }
    }
  }, [value, view]);

  const preventBrowserKeypmapConflict = (event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "s" ||
        event.key === "S" ||
        event.key === "Enter" ||
        (event.shiftKey && event.key === "C") ||
        (event.shiftKey && event.key === "c"))
    ) {
      event.preventDefault();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", preventBrowserKeypmapConflict);
    return () => {
      window.removeEventListener("keydown", preventBrowserKeypmapConflict);
    };
  }, []);
  return { ref };
}
