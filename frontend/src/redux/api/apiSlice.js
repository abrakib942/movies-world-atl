import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://movies-world-seven.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["movie", "user"],
});
