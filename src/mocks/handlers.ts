import { RestRequest, rest } from "msw";

import { delay } from "@/utils/helperFunc";

import products from "./sampleResponses/products";
import customers from "./sampleResponses/customers";
import { QueryResult } from "@/utils/schemas/SqlWorkspace.types";
import suppliers from "./sampleResponses/suppliers";

interface QueryRequest extends RestRequest {
  body: {
    query: string;
  };
}

const queryMap = {
  "select * from products;": products,
  "select * from customers;": customers,
  "select * from suppliers;": suppliers,
} as Record<string, QueryResult>;

export const handlers = [
  rest.post<QueryRequest>("/execute-query", async (req, res, ctx) => {
    const { query } = await req.json();
    const response = queryMap[query.toLowerCase().replace(/\s+/g, ' ').trim()];
    if (response) {
      await delay(800);
    }
    return res(ctx.status(200), ctx.json(response||{
      columns: [],
      rows: [],
    }));
  }),
];
