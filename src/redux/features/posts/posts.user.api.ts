/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const postUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/post`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["post"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `Post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/post",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),

    updatePost: builder.mutation({
      query: (data) => {
        return {
          url: `/post/update/${data?.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `Post/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetAllPostQuery,
} = postUserApi;
