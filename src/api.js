import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'f3afb1922e25d3ce3f074918529d7993',
        language: 'en-US',
    } 
});

export const tvApi = {
    topRated: () => api.get('tv/top_rated'),
    popular: () => api.get('tv/popular'),
    airingToday: () => api.get('tv/airing_today'),
    showDetail: (id) => api.get(`tv/${id}`,{
        params: {
            append_to_response: "videos"
        }
    }),
    search: term => api.get('search/tv', {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

export const MoviesApi = {
    nowPlaying: () => api.get('movie/now_playing'),
    upComing: () => api.get('movie/upcoming'),
    popular: () => api.get('movie/popular'),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term => api.get('search/movie', {
        params: {
            query: encodeURIComponent(term)
        }
    })
}

export default api;