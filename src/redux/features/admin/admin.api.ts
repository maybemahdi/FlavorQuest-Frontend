/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all posts
    getAllPosts: builder.query({
      query: (params) => {
        const queryParams: Record<string, string> = {};

        if (params) {
          if (params.searchTerm?.trim()) {
            queryParams.searchTerm = params.searchTerm.trim();
          }

          if (params.role?.trim()) {
            queryParams.role = params.role;
          }

          if (params.page) {
            queryParams.page = params.page.toString();
          }

          if (params.limit) {
            queryParams.limit = params.limit.toString();
          }

          if (params.status) {
            queryParams.status = params.status.toString();
          }
        }

        return {
          url: "/post",
          method: "GET",
          params: queryParams,
        };
      },
      transformResponse: (response: any) => ({
        data: response.data?.data,
        meta: response.data?.meta,
      }),
      providesTags: ["admin"],
    }),

    // Update posts
    updatePosts: builder.mutation({
      query: ({ data, order_id }) => {
        return {
          url: `/post/update/${order_id}`,
          method: "PATCH",
          body: data,
        };
      },
      transformResponse: (response: any) => ({
        data: response.data,
      }),
      invalidatesTags: ["admin"],
    }),

    deletePost: builder.mutation({
      query: (userId: string) => ({
        url: `/post/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),

    // Get all users
    getAllUser: builder.query({
      query: (params) => {
        const queryParams: Record<string, string> = {};

        if (params) {
          if (params.searchTerm?.trim()) {
            queryParams.searchTerm = params.searchTerm.trim();
          }

          if (params.role?.trim()) {
            queryParams.role = params.role;
          }

          if (params.page) {
            queryParams.page = params.page.toString();
          }

          if (params.limit) {
            queryParams.limit = params.limit.toString();
          }

          if (params.status) {
            queryParams.status = params.status;
          }
        }

        return {
          url: "/users",
          method: "GET",
          params: queryParams,
        };
      },
      transformResponse: (response: any) => ({
        data: response.data?.data,
        meta: response.data?.paginateData,
      }),
      providesTags: ["admin"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),

    // Get all comments
    getAllComments: builder.query({
      query: () => ({
        url: "/comment",
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        data: response.data,
      }),
    }),


    getAllRatings: builder.query({
      query: () => ({
        url: "/post/admin-stats", 
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        data: response.data,
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useUpdatePostsMutation,
  useDeletePostMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useGetAllCommentsQuery,
  useGetAllRatingsQuery,  
} = adminApi;
