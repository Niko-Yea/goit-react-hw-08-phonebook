import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const phonebookApi = createApi({
  reducerPath: 'phonebookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  tagTypes: ['contacts'],

  endpoints: builder => ({
    createContact: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
    fetchContacts: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),
      providesTags: ['contacts'],
    }),
  }),
})

export const {
  useCreateContactMutation,
  useDeleteContactMutation,
  useFetchContactsQuery,
} = phonebookApi
