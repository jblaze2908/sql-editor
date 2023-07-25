export async function executeQueryApi(query: string) {
  const res = await fetch("/execute-query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
