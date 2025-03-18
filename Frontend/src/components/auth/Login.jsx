import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const history = useHistory();
  const { login, isAuthenticated, error, clearError } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/profile');
    }

    if (error) {
      setAlertMessage(error);
      clearError();
    }
  }, [isAuthenticated, error, clearError, history]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-body">
          <h1 className="text-center mb-4">Iniciar Sesión</h1>
          
          {alertMessage && (
            <div className="alert alert-danger">{alertMessage}</div>
          )}
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="form-control"
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Iniciar Sesión
            </button>
          </form>
          
          <p className="text-center mt-3">
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;