import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "my-blog-next39",
  apiKey: process.env.API_KEY,
});
