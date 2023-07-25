import styles from "./Buttons.module.scss";
import { Button } from "@/components/lib/FormElements";
import { ExecuteQueryIcon } from "./Icons";

interface ButtonsProps {
  runQuery: () => void;
  formatQuery: () => void;
  saveQuery: () => void;
  clearEditor: () => void;
}
export default function Buttons({
  runQuery,
  formatQuery,
  saveQuery,
  clearEditor,
}: ButtonsProps) {
  return (
    <div className={styles.buttons}>
      <Button
        buttonType="primary"
        filled
        onClick={runQuery}
        tooltipContent="Execute a SQL query (Alt+Enter)"
        className={styles.executeButton}
      >
        Run Query <ExecuteQueryIcon />
      </Button>
      <Button
        buttonType="primary"
        onClick={formatQuery}
        tooltipContent="Format your SQL query (Alt+Shift+F)"
      >
        Format Query
      </Button>
      <Button
        buttonType="primary"
        onClick={saveQuery}
        tooltipContent="Save your SQL query (Ctrl+S)"
      >
        Save Query
      </Button>
      <Button
        buttonType="danger"
        onClick={clearEditor}
        tooltipContent="Clear your SQL query (Ctrl+Shift+C)"
      >
        Clear
      </Button>
    </div>
  );
}
