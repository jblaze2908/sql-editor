type TableRow = Record<string, unknown>;

export interface TableProps<T extends TableRow> {
  columns: string[];
  rows: T[];
  height?: number;
  windowed?: boolean;
}
