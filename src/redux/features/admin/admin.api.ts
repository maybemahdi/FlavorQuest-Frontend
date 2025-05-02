/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (data) => {
        const params = new URLSearchParams();

        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "api/v1/post",
          method: "GET",
          params,
        };
      },
      providesTags: ["admin"],
    }),
  }),
});

export const { useGetAllPostsQuery } = adminApi;
