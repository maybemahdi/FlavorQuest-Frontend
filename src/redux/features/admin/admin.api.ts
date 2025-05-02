/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
      
        if (params) {
          if (params.searchTerm?.trim()) {
            queryParams.append("searchTerm", params.searchTerm.trim());
          }
      
          if (params.role?.trim()) {
            queryParams.append("role", params.role);
          }
      
          if (params.page) {
            queryParams.append("page", params.page.toString());
          }
      
          if (params.limit) {
            queryParams.append("limit", params.limit.toString());
          }
        }
      
        return {
          url: "/post",
          method: "GET",
          params: queryParams,
        };
      },
      
      transformResponse: (response: any) => {
        return {
          data: response.data?.data,
          meta: response.data?.meta,
        };
      },
      providesTags: ["admin"],
    }),
  
    updatePosts: builder.mutation({
      query: ({ data, order_id }) => {
        console.log(data, order_id);
        return {
          url: `/post/update/${order_id}`,
          method: "PATCH",
          body: data,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["admin"],
    }),
  }),
  
});

export const { 
  useGetAllPostsQuery,
  useUpdatePostsMutation

} = adminApi;
