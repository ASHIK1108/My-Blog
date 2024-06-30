import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => axios.get(`${API_URL}/posts`);


export const fetchPostById = (id) => axios.get(`${API_URL}/posts/${id}`);

export const fetchUserById = (id) => axios.get(`${API_URL}/users/${id}`);
