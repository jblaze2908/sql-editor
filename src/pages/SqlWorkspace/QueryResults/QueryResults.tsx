import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Loader from "@/components/Loader/Loader";
import { useSqlWorkspace } from "@/context/sql-workspace-context";
import { RowObject } from "@/utils/schemas/SqlWorkspace.types";
import Table from "@/components/lib/Table";
import styles from "./QueryResults.module.scss";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import ExportDataModal from "@/components/ExportDataModal/ExportDataModal";

export default function QueryResults({ newHeight }: { newHeight?: number }) {
  const [tableHeight, setTableHeight] = useState(0);
  const [filteredRows, setFilteredRows] = useState<RowObject[]>([]);
  const [showExportDataModal, setShowExportDataModal] =
    useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isLoading,
    queryResults,
    queryResultsFilterValue,
    setQueryResultsFilterValue,
    queryResultsActiveTab,
    setQueryResultsActiveTab,
  } = useSqlWorkspace();

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      setTableHeight(containerHeight);
    }
  }, [!!queryResults]);

  const searchFilteredRows = useCallback(
    (filterString: string) => {
      if (queryResults) {
        const filteredResults = queryResults.rows.filter((row) => {
          const values = Object.values(row);
          return values.some((val) =>
            val.toString().toLowerCase().includes(filterString.toLowerCase())
          );
        });
        setFilteredRows(filteredResults);
      }
    },
    [queryResults]
  );

  useEffect(() => {
    if (!queryResultsFilterValue && queryResults) {
      setFilteredRows(queryResults.rows);
    } else if (queryResultsFilterValue) {
      searchFilteredRows(queryResultsFilterValue);
    }
  }, [queryResultsFilterValue, queryResults, searchFilteredRows]);

  const queryResultsMemoized = useMemo(() => {
    console.log("rememoizing 2");
    return queryResultsActiveTab === "METADATA"
      ? queryResults?.fields || []
      : filteredRows;
  }, [queryResultsActiveTab, filteredRows, queryResults]);
  const columnsMemoized = useMemo(() => {
    console.log("rememoizing");
    return queryResultsActiveTab === "METADATA"
      ? ["name", "type"]
      : queryResults?.rows.length
      ? Object.keys(queryResults.rows[0])
      : [];
  }, [queryResultsActiveTab, queryResults]);
  if (isLoading) {
    return (
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.loader}>
            <Loader />
            <div className={styles.loaderText}>Executing Query...</div>
          </div>
        )}
      </div>
    );
  }
  if (!queryResults) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.loaderText}>Run a query</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <ResultsHeader
        queryResultsActiveTab={queryResultsActiveTab}
        setQueryResultsActiveTab={setQueryResultsActiveTab}
        queryResultsFilterValue={queryResultsFilterValue}
        searchFilteredRows={searchFilteredRows}
        setQueryResultsFilterValue={setQueryResultsFilterValue}
        displayExportDataModal={() => setShowExportDataModal(true)}
      />
      <div className={styles.content} ref={containerRef}>
        <Table
          columns={columnsMemoized}
          height={newHeight ? newHeight - 58 : tableHeight - 5 || 0}
          rows={queryResultsMemoized}
          windowed
        />
      </div>
      <ExportDataModal
        rows={filteredRows}
        isOpen={showExportDataModal}
        hideModal={() => setShowExportDataModal(false)}
      />
    </div>
  );
}
