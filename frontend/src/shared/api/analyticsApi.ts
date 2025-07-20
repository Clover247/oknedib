
import { apiSlice } from './apiSlice';

// TODO: Define Analytics types

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProjectAnalytics: builder.query<any, void>({
      query: () => '/analytics/projects',
    }),
    getFinancialAnalytics: builder.query<any, { startDate?: string; endDate?: string }>({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        return `/analytics/financial?${params.toString()}`;
      },
    }),
    getContentAnalytics: builder.query<any, void>({
      query: () => '/analytics/content',
    }),
    getSpecialistAnalytics: builder.query<any, void>({
      query: () => '/analytics/specialists',
    }),
  }),
});

export const { useGetProjectAnalyticsQuery, useGetFinancialAnalyticsQuery, useGetContentAnalyticsQuery, useGetSpecialistAnalyticsQuery } = analyticsApiSlice;
