import { Button } from "../lib/FormElements";
import Modal from "../lib/Modal/Modal";
import styles from "./ExportDataModal.module.scss";
import Papa from "papaparse";

import type { ExportDataModalProps } from "./ExportDataModal.types";
import { CsvIcon, JsonIcon } from "./Icons";
import { downloadFile } from "@/utils/helperFunc";
import { useState } from "react";
import { showToastMessage } from "../lib/ToastMessage";

export default function ExportDataModal({
  rows,
  isOpen,
  hideModal,
}: ExportDataModalProps) {
  const [fileBeingExported, setFileBeingExported] = useState<
    "CSV" | "JSON" | null
  >();
  const exportCsv = () => {
    if (fileBeingExported) return;
    setFileBeingExported("CSV");
    const csvData = Papa.unparse(rows);
    const blob = new Blob([csvData], { type: "text/csv" });
    downloadFile("data.csv", blob);
    showToastMessage("success", "CSV file exported.");
    setFileBeingExported(null);
  };
  const exportJson = () => {
    if (fileBeingExported) return;
    setFileBeingExported("JSON");
    const blob = new Blob([JSON.stringify(rows)], { type: "text/json" });
    downloadFile("data.json", blob);
    showToastMessage("success", "JSON file exported.");
    setFileBeingExported(null);
  };
  return (
    <Modal isOpen={isOpen} hideModal={hideModal}>
      <div className={styles.container}>
        <h4 className={styles.title}>Export Data</h4>
        <p className={styles.description}>
          You are exporting {rows.length} rows
        </p>
        <br />
        <p className={styles.description}>Choose Format</p>
        <div className={styles.buttons}>
          <Button
            buttonType="secondary"
            className={styles.cardButton}
            onClick={exportCsv}
            isLoading={fileBeingExported === "CSV"}
          >
            <CsvIcon />
          </Button>
          <Button
            buttonType="secondary"
            className={styles.cardButton}
            isLoading={fileBeingExported === "JSON"}
            onClick={exportJson}
          >
            <JsonIcon />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
