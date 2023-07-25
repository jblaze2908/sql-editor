import { FixedSizeList as List } from "react-window";
import clsx from "clsx";
import styles from "./Table.module.scss";
import type { TableProps } from "./Table.types";

export default function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  windowed = false,
  height,
}: TableProps<T>) {
  return (
    <table className={styles.table}>
      <tr className={clsx(styles.header, styles.row)}>
        <th className={styles.item}>SNo.</th>
            {columns.map((column: string, index: number) => (
                         <th key={index} className={styles.item}>
            {column}
          </th>
        ))}
      </tr>
      <tbody className={styles.body}>
        {windowed && height ? (
          <List
            height={height - 44}
            itemCount={rows.length}
            itemSize={28}
            width="100%"
          >
            {({
              index,
              style,
            }: {
              index: number;
              style: React.CSSProperties;
            }) => (
              <tr style={style} className={styles.row}>
                <td className={styles.item}>{index + 1}</td>
                {columns.map((column: string, columnKey: number) => (
                  <td key={columnKey} className={styles.item}>
                    {rows[index][column] as string}
                  </td>
                ))}
              </tr>
            )}
          </List>
        ) : (
          <>
            {rows.map((row: T, index: number) => (
              <tr key={index} className={styles.row}>
                <td className={styles.item}>{index + 1}</td>
                {columns.map((column: string, columnKey: number) => (
                  <td key={columnKey} className={styles.item}>
                    {row[column] as string}
                  </td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
