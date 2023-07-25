import Table from "@/components/lib/Table";
import { QueryHistoryItem } from "@/utils/schemas/SqlWorkspace.types";
import { useSqlWorkspace } from "@/context/sql-workspace-context";

import styles from "./QueryHistory.module.scss";

export default function QueryHistory() {
  const { queryHistory } = useSqlWorkspace();
  return (
    <div className={styles.container}>
      <header className={styles.header}>Query History</header>
      <div className={styles.content}>
        <Table<QueryHistoryItem>
          columns={
            queryHistory.length > 0
              ? Object.keys(queryHistory[0])
              : ["Action", "Result"]
          }
          rows={queryHistory}
        />
      </div>
    </div>
  );
}
