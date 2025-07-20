
import { apiSlice } from './apiSlice';

// TODO: Define Payment, BudgetHistory types

export const financesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPaymentsByProjectId: builder.query<any[], string>({
      query: (projectId) => `/payments?projectId=${projectId}`,
      providesTags: (result = [], error, arg) => [
        { type: 'Payment', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Payment' as const, id })),
      ],
    }),
    createPayment: builder.mutation<any, Partial<any>>({
      query: (payment) => ({
        url: '/payments',
        method: 'POST',
        body: payment,
      }),
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }],
    }),
    updatePayment: builder.mutation<any, Partial<any>>({
      query: (payment) => ({
        url: `/payments/${payment.id}`,
        method: 'PATCH',
        body: payment,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Payment', id: arg.id }],
    }),
    deletePayment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Payment', id }],
    }),
    getBudgetHistoryByProjectId: builder.query<any[], string>({
      query: (projectId) => `/projects/${projectId}/budget-history`,
      providesTags: (result = [], error, arg) => [
        { type: 'BudgetHistory', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'BudgetHistory' as const, id })),
      ],
    }),
    createBudgetHistory: builder.mutation<any, Partial<any>>({
      query: ({ projectId, ...history }) => ({
        url: `/projects/${projectId}/budget-history`,
        method: 'POST',
        body: history,
      }),
      invalidatesTags: [{ type: 'BudgetHistory', id: 'LIST' }],
    }),
  }),
});

export const { useGetPaymentsByProjectIdQuery, useCreatePaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation, useGetBudgetHistoryByProjectIdQuery, useCreateBudgetHistoryMutation } = financesApiSlice;
