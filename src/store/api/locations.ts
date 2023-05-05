import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../consts";

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getLocationById: builder.query<CharacterLocation[], number | number[]>({
      query: (id) => `/location/${id}`,
      transformResponse(
        data: ResponseDetails<CharacterLocation[]> | CharacterLocation
      ) {
        return "results" in data ? data.results : [data];
      },
    }),
  }),
});

export const { useGetLocationByIdQuery } = locationsApi;
