import { TextField } from "@/components/lib/FormElements";
import styles from "./ResultsHeader.module.scss";
import { ExportIcon } from "../Icons";
import { useEffect, useRef } from "react";
import { ResultsActiveTab } from "@/utils/schemas/SqlWorkspace.types";
import clsx from "clsx";

interface ResultsHeaderProps {
  queryResultsFilterValue: string;
  setQueryResultsFilterValue: (val: string) => void;
  searchFilteredRows: (val: string) => void;
  displayExportDataModal: () => void;
  queryResultsActiveTab: ResultsActiveTab;
  setQueryResultsActiveTab: (val: ResultsActiveTab) => void;
}

export default function ResultsHeader({
  queryResultsFilterValue,
  setQueryResultsFilterValue,
  searchFilteredRows,
  displayExportDataModal,
  queryResultsActiveTab,
  setQueryResultsActiveTab,
}: ResultsHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchFilteredRows(queryResultsFilterValue);
    }
  };
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      inputRef.current?.focus();
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.searchContainer}>
          <label className={styles.searchLabel}>Search</label>
          <TextField
            value={
              queryResultsActiveTab === "METADATA"
                ? ""
                : queryResultsFilterValue
            }
            onChange={(e) => setQueryResultsFilterValue(e.target.value)}
            onKeyDown={onEnter}
            placeholder="Ctrl + K"
            ref={inputRef}
            disabled={queryResultsActiveTab === "METADATA"}
          />
        </div>
        <div className={styles.switchContainer}>
          <div className={styles.label}>Viewing</div>
          <div className={styles.switch}>
            <div
              className={clsx(
                styles.switchItem,
                queryResultsActiveTab === "RESULTS" && styles.switchItemActive
              )}
              onClick={() => setQueryResultsActiveTab("RESULTS")}
            >
              Results
            </div>
            <div
              className={clsx(
                styles.switchItem,
                queryResultsActiveTab === "METADATA" && styles.switchItemActive
              )}
              onClick={() => setQueryResultsActiveTab("METADATA")}
            >
              Field Types
            </div>
          </div>
        </div>
      </div>
      <button className={styles.exportButton} onClick={displayExportDataModal}>
        Export <ExportIcon />
      </button>
    </header>
  );
}
