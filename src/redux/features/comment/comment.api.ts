/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/comment`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["comment"],
    }),
    getSingleComment: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    createComment: builder.mutation({
      query: (data) => {
        return {
          url: "/post",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentQuery,
  useGetSingleCommentQuery,
} = commentApi;
