import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      alert('Inicio de sesión exitoso');
      navigate('/home');
    } catch (error) {
      alert('Error en el inicio de sesión');
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>MarTutors</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
        <div className="login-footer">
          <span>¿No tienes cuenta?</span>
          <button onClick={() => navigate('/register')} className="register-btn">
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;