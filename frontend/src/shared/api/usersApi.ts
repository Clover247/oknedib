
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<any[], void>({
      query: () => '/users',
    }),
    updateProfile: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/profile',
        method: 'PATCH',
        body: credentials,
      }),
    }),
    uploadAvatar: builder.mutation<any, any>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/profile/avatar',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateProfileMutation, useUploadAvatarMutation } = usersApiSlice;
