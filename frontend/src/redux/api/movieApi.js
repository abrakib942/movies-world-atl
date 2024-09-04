import { baseApi } from "./apiSlice";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addMovie: build.mutation({
      query: (data) => ({
        url: "/movies/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["movie"],
    }),
    getAllMovies: build.query({
      query: (arg) => ({
        url: "/movies",
        params: arg,
        method: "GET",
      }),
      providesTags: ["movie"],
    }),
    getSingleMovie: build.query({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "GET",
      }),
      providesTags: ["movie"],
    }),
    updateMovie: build.mutation({
      query: ({ id, data }) => ({
        url: `/movies/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["movie"],
    }),
    deleteMovie: build.mutation({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["movie"],
    }),
  }),
});

export const {
  useAddMovieMutation,
  useGetAllMoviesQuery,
  useGetSingleMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = movieApi;
