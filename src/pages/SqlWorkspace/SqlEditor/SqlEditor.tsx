import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatSQL } from "@/utils/helperFunc";
import { ThemeContext } from "@/context/theme-context";
import { useSqlWorkspace } from "@/context/sql-workspace-context";
import styles from "./SqlEditor.module.scss";
import Buttons from "./Buttons/Buttons";
import Tabs from "./Tabs/Tabs";
import SaveQueryModal from "@/components/SaveQueryModal/SaveQueryModal";
import CodeEditor from "@/components/CodeEditor/CodeEditor";

export default function SqlEditor() {
  const [showSaveQueryModal, setShowSaveQueryModal] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const {
    editorValue,
    updateEditorValue,
    executeQuery: executeQueryFunc,
    activeTabs,
    switchToTab,
    saveQuery,
    deleteTab,
  } = useSqlWorkspace();
  const editorValueRef = useRef(editorValue);
  useEffect(() => {
    editorValueRef.current = editorValue;
  }, [editorValue]);

  const formatQuery = useCallback(() => {
    updateEditorValue(formatSQL(editorValueRef.current));
  }, []);

  const clearEditor = useCallback(() => {
    updateEditorValue("");
  }, []);
  const executeQuery = useCallback(() => {
    executeQueryFunc(editorValueRef.current);
  }, []);

  const keyMaps = useMemo(() => {
    return {
      "Ctrl-s": () => {
        if (editorValueRef.current) {
          setShowSaveQueryModal(true);
        }
        return false;
      },
      "Ctrl-S": () => {
        if (editorValueRef.current) {
          setShowSaveQueryModal(true);
        }
        return false;
      },
      "Cmd-s": () => {
        if (editorValueRef.current) {
          setShowSaveQueryModal(true);
        }
        return false;
      },
      "Cmd-S": () => {
        if (editorValueRef.current) {
          setShowSaveQueryModal(true);
        }
        return false;
      },
      "Alt-Enter": () => {
        executeQuery();
        return false;
      },
      "Alt-Shift-f": () => {
        formatQuery();
        return false;
      },
      "Alt-Shift-F": () => {
        formatQuery();
        return false;
      },
      "Ctrl-Shift-c": () => {
        clearEditor();
        return false;
      },
      "Ctrl-Shift-C": () => {
        clearEditor();
        return false;
      },
      "Cmd-Shift-c": () => {
        clearEditor();
        return false;
      },
      "Cmd-Shift-C": () => {
        clearEditor();
        return false;
      },
    };
  }, [formatQuery, clearEditor]);

  return (
    <div className={styles.container}>
      <div className={styles.headerMain}>
        <Tabs
          switchToTab={switchToTab}
          activeTabs={activeTabs}
          deleteTab={deleteTab}
        />
        <Buttons
          formatQuery={formatQuery}
          clearEditor={clearEditor}
          runQuery={executeQuery}
          saveQuery={() => {
            setShowSaveQueryModal(true);
          }}
        />
      </div>
      <div className={styles.editor}>
        <CodeEditor
          editorValue={editorValue}
          updateEditorValue={updateEditorValue}
          keyMaps={keyMaps}
          theme={theme}
        />
      </div>
      <SaveQueryModal
        isOpen={showSaveQueryModal}
        hideModal={() => setShowSaveQueryModal(false)}
        query={editorValue}
        saveQuery={saveQuery}
      />
    </div>
  );
}
