
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000', // TODO: Move to .env
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token; // TODO: Create a proper selector
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Project', 'Task', 'Payment', 'ContentPlan', 'BudgetHistory'], // Теги для кешування
  endpoints: _builder => ({})
});
