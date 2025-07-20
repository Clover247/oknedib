
import { apiSlice } from './apiSlice';

// TODO: Define ContentPlan and ContentPlanItem types

export const contentPlansApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getContentPlansByProjectId: builder.query<any[], string>({
      query: (projectId) => `/content-plans?projectId=${projectId}`,
      providesTags: (result = [], error, arg) => [
        { type: 'ContentPlan', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'ContentPlan' as const, id })),
      ],
    }),
    createContentPlan: builder.mutation<any, Partial<any>>({
      query: (contentPlan) => ({
        url: '/content-plans',
        method: 'POST',
        body: contentPlan,
      }),
      invalidatesTags: [{ type: 'ContentPlan', id: 'LIST' }],
    }),
    updateContentPlan: builder.mutation<any, Partial<any>>({
      query: (contentPlan) => ({
        url: `/content-plans/${contentPlan.id}`,
        method: 'PATCH',
        body: contentPlan,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'ContentPlan', id: arg.id }],
    }),
    deleteContentPlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/content-plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'ContentPlan', id }],
    }),
    uploadContentPlanFile: builder.mutation<any, { itemId: string; file: File }>({
      query: ({ itemId, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/content-plans/${itemId}/files`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'ContentPlan', id: arg.itemId }],
    }),
  }),
});

export const { useGetContentPlansByProjectIdQuery, useCreateContentPlanMutation, useUpdateContentPlanMutation, useDeleteContentPlanMutation, useUploadContentPlanFileMutation } = contentPlansApiSlice;
