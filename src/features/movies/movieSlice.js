import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieApi from '../../api/movieApi'

const apikey = '715289b'

export const fetchMovies = createAsyncThunk(
    'moviesRTK/fetchMovies',
    async (page) => {
        const movieTitle = 'Batman'
        const response = await movieApi.get(`?apiKey=${apikey}&s=${movieTitle}&page=${page}`)
        return response.data.Search
    }
)
export const fetchDetailMovie = createAsyncThunk(
    'moviesRTK/fetchDetailMovie',
    async (id) => {
        const response = await movieApi.get(`?apiKey=${apikey}&i=${id}`)
        return response.data
    }
)

const movieSlice = createSlice({
    name : 'movies',
    initialState : {
        movies : [],
        detailMovie : {},
        page : 1
    },
    reducers : {
        loadPage(state) {
            state.page += 1
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(
            fetchMovies.pending, () => {
                console.log('Loading...');
            }
        )
        .addCase(
            fetchMovies.fulfilled, (state, action) => {
                state.movies = state.movies.concat(action.payload) 
            }
        )
        .addCase(
            fetchMovies.rejected, () => {
                console.log("Terjadi Error");
            }
        )
        .addCase(
            fetchDetailMovie.pending, () => {
                console.log('Loading...');
            }
        )
        .addCase(
            fetchDetailMovie.fulfilled, (state, action) => {
                state.detailMovie = action.payload
                console.log('success');
            }
        )
        .addCase(
            fetchDetailMovie.rejected, () => {
                console.log("Terjadi Error");
            }
        )
    }
})

export const { loadPage } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies
export const getDetailMovie = (state) => state.movies.detailMovie
export const getPage = (state) => state.movies.page
export default movieSlice.reducer