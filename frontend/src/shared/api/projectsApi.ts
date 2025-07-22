
import { apiSlice } from './apiSlice';

// TODO: Define Project type

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<any[], void>({
      query: () => '/projects',
      providesTags: (result = [], _error, _arg) => [
        'Project',
        ...result.map(({ id }) => ({ type: 'Project' as const, id })),
      ],
    }),
    getProjectById: builder.query<any, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<any, Partial<any>>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<any, Partial<any> & { id: string }>({
      query: ({ id, ...project }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: project,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery, useCreateProjectMutation, useUpdateProjectMutation } = projectsApiSlice;
