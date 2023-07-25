import { TabData } from "./schemas/SqlWorkspace.types";

export function formatSQL(sql: string) {
  const keywords = [
    "select",
    "from",
    "where",
    "limit",
    "group by",
    "order by",
    "left join",
    "inner join",
    "right join",
    "on",
    "as",
    "insert into",
    "values",
    "update",
    "set",
    "delete from",
    "create table",
    "alter table",
    "drop table",
    "union",
    "union all",
    "like",
    "in",
    "between",
    "exists",
    "all",
    "any",
    "distinct",
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  return (
    sql
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/, /g, ",\n\t") // Line break after each comma
      .replace(keywordRegex, (match) => match.toUpperCase())
      .replace(
        /(SELECT|FROM|WHERE|LIMIT|OFFSET|GROUP BY|\(|\)|HAVING|ORDER BY|LEFT JOIN|INNER JOIN|RIGHT JOIN)\b/g,
        "\n$1"
      )
      .replace(
        /(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LEFT JOIN|INNER JOIN|RIGHT JOIN)\b/g,
        "$1\n\t"
      )
      // .replace(/^/gm, "\t") + "\n".trim()
      .trim()
  ); // Indent each line
}

export function getSystemPreferredColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function generateRandomId(length: number) {
  const alphanumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    id += alphanumeric.charAt(randomIndex);
  }

  return id;
}

export function downloadFile(fileName: string, blob: Blob) {
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function getDefaultActiveTabs() {
  return [
    {
      id: generateRandomId(10),
      isActive: true,
      queryResult: undefined,
      title: "Sql Query 1",
      editorValue: "",
      filterValue: "",
      resultsActiveTab: "RESULTS",
    },
  ] as TabData[];
}

export function getDefaultSavedQueries() {
  return [
    {
      title: "Fetch Products",
      query: "SELECT * FROM products;",
      id: generateRandomId(10),
    },
    {
      title: "Fetch Customers",
      query: "SELECT * FROM customers;",
      id: generateRandomId(10),
    },
    {
      title: "Fetch Suppliers",
      query: "SELECT * FROM suppliers;",
      id: generateRandomId(10),
    },
  ];
}

export function getNewTab(editorValue: string, tabNumber: number) {
  return {
    id: generateRandomId(10),
    editorValue,
    filterValue: "",
    isActive: true,
    resultsActiveTab: "RESULTS",
    queryResult: undefined,
    title: `SQL Query ${tabNumber}`,
  } as TabData;
}
