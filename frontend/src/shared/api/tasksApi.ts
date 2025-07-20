
import { apiSlice } from './apiSlice';

// TODO: Define Task type

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTasksByProjectId: builder.query<any[], string>({
      query: (projectId) => `/tasks?projectId=${projectId}`,
      providesTags: (result = [], error, arg) => [
        { type: 'Task', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Task' as const, id })),
      ],
    }),
    createTask: builder.mutation<any, Partial<any>>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation<any, Partial<any>>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PATCH',
        body: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.id }],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
  }),
});

export const { useGetTasksByProjectIdQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApiSlice;
