import axios from "axios"

const API_KEY = 'cae21727a868d33829c199501efa6a07'
// const API_READ_KEY ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWUyMTcyN2E4NjhkMzM4MjljMTk5NTAxZWZhNmEwNyIsIm5iZiI6MTc0NzIzMTQ0Ni4zMTIsInN1YiI6IjY4MjRhMmQ2N2E0ZDI3NWJiNTZlZjFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l6_-AgfG07nlzwoty1FvFwOgVqnaYqMQ_0FboAesfeI'
const BASE_URL = 'https://api.themoviedb.org/3'

const tmdb = axios.create({
    baseURL:BASE_URL,
    params:{
        api_key:API_KEY,
        language:'en-US'
    }
})

export default tmdb