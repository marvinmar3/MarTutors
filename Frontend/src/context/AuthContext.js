import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import api from '../utils/api';

// Crear contexto
export const AuthContext = createContext();

// Estado inicial
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'AUTH_ERROR':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Proveedor de contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Cargar usuario
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        api.defaults.headers.common['x-auth-token'] = localStorage.token;
      } else {
        delete api.defaults.headers.common['x-auth-token'];
      }

      try {
        const res = await api.get('/api/auth/me');

        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR'
        });
      }
    };

    loadUser();
  }, []);

  // Registrar usuario
  const register = async formData => {
    try {
      const res = await api.post('/api/auth/register', formData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Iniciar sesión
  const login = async formData => {
    try {
      const res = await api.post('/api/auth/login', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Cerrar sesión
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Limpiar errores
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  // Cargar usuario
  const loadUser = async () => {
    if (localStorage.token) {
      api.defaults.headers.common['x-auth-token'] = localStorage.token;
    }

    try {
      const res = await api.get('/api/auth/me');

      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearError,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};