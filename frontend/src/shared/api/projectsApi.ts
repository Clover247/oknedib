
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
    createProject: builder.mutation<any, Partial<any>>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApiSlice;
