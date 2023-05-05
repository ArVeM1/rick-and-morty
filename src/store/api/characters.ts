import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../consts";
import { RootState } from "../store";
import { setPage, setTotalCount } from "../slices/filter";

type CharacterQueryParam = {
  name?: string;
  page?: number;
};

export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ResponseDetails<Character[]>, void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const state = queryApi.getState();
        const { searchValue, page, totalCount } = (state as RootState).filter;

        const res = (await baseQuery(
          `/character?name=${searchValue}&page=${page}`
        )) as any;

        if (res.data.info.count !== totalCount) {
          queryApi.dispatch(setTotalCount(res.data.info.count));
          queryApi.dispatch(setPage(0));
        }

        return res;
      },
    }),
    getCharacterById: builder.query<Character, any>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterByIdQuery } =
  charactersApi;
