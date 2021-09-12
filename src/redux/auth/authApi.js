import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),

  tagTypes: ['users', 'contacts'],

  endpoints: builder => ({
    createNewUser: builder.mutation({
      query: newUser => ({
        url: '/users/signup',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['users'],
    }),
    siginUser: builder.mutation({
      query: userData => ({
        url: '/users/login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['users'],
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST'
      }),
      invalidatesTags: ['users'],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/users/current',
        method: 'GET',
        invalidatesTags: ['users'],
      }),
    }),
  })
});

export const {
  useCreateNewUserMutation,
  useSiginUserMutation,
  useLogOutUserMutation,
  useGetCurrentUserQuery,
} = authApi