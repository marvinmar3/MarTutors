import axios from 'axios';

const api= axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3030',
	headers: {
		'Content-Type': 'application/json'
	}
});

//interceptor para agrear el token a todas las solicitudes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;