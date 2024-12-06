import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://backend-mdw.onrender.com/',
    withCredentials: true
})

export default instance