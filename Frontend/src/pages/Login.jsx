import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      alert("Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      alert("Error en el inicio de sesión");
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <h2>MarTutors</h2>
          <p>Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <span>¿No tienes cuenta?</span>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-link"
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
