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
    updatePosts: builder.mutation({
      query: ({ data, order_id }) => {
        console.log(data,order_id)
        return {
          url: `/post/update/${order_id}`,
          method: "PATCH",
          body: data,
        };
      
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response:any) => {
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
