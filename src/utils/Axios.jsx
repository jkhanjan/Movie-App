import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGRmYjJkMGFkZjQxNDBjMjhiM2MzZTVjYWM5NDZmNiIsInN1YiI6IjY1YjNiNjZhYTA2NjQ1MDE2MzhkOWRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B6Q5maud2saE77jnBDpY5luiiydwucMCW_X-_BAdoCo'
      }
})

export default instance;