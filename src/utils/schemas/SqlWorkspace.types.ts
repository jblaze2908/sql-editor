export interface QueryHistoryItem {
  [key: string]: unknown;
  Action: string;
  Result: string;
}
export interface SavedQueryItem {
  id: string;
  title: string;
  query: string;
}
export interface RowObject {
  [key: string]: string | number;
}
export interface QueryResult {
  rows: RowObject[];
  fields: {
    name: string;
    type: string;
  }[];
}
export type ResultsActiveTab = "RESULTS" | "METADATA";
export interface TabData {
  id: string;
  isActive: boolean;
  title: string;
  editorValue: string;
  filterValue: string;
  resultsActiveTab: ResultsActiveTab;
  queryResult?: QueryResult;
}
