/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

// Define the API for the admin
const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            queryParams.append(key, value as string);
          });
        }

        console.log(queryParams.toString()); 

        return {
          url: "/post",
          method: "GET",
          params: queryParams,
        };
      },
      transformResponse: (response:any) => {
        return {
          data: response.data?.data,
          meta: response.data?.meta,
        };
      },
      providesTags: ["admin"], 
    }),
  }),
});

export const { useGetAllPostsQuery } = adminApi;
