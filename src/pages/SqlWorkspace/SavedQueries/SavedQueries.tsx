import { useSqlWorkspace } from "@/context/sql-workspace-context";

import styles from "./SavedQueries.module.scss";

export default function SavedQueries() {
  const { savedQueries, restoreSavedQuery } = useSqlWorkspace();
  return (
    <div className={styles.container}>
      <header className={styles.header}>Saved Queries</header>
      <div className={styles.content}>
        {savedQueries.map((item) => (
          <SavedQuery
            key={item.id}
            title={item.title}
            query={item.query}
            onClick={() => restoreSavedQuery(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
function SavedQuery({
  title,
  query,
  onClick,
}: {
  title: string;
  query: string;
  onClick: () => void;
}) {
  return (
    <div className={styles.savedQuery} onClick={onClick}>
      <div className={styles.savedQueryTitle}>{title}</div>
      <div className={styles.savedQueryCommand}>{query}</div>
    </div>
  );
}
