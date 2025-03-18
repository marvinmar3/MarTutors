import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate en lugar de useHistory
import { registerUser } from '../services/authService';  // Asegúrate de tener este servicio
import '../styles/login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: '',
    faculty: '',
    career: ''
  });

  const [faculties, setFaculties] = useState([]);
  const [careers, setCareers] = useState([]);

  const navigate = useNavigate();

  // Cargar facultades desde el backend
  useEffect(() => {
    fetch('/api/faculties')
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error('Error al cargar las facultades: ', error));
  }, []);

  // Cargar carreras cuando selecciona una facultad
  useEffect(() => {
    if (formData.faculty) {
      fetch(`/api/careers/${formData.faculty}`)
        .then((response) => response.json())
        .then((data) => setCareers(data))
        .catch((error) => console.error('Error al cargar carreras: ', error));
    }
  }, [formData.faculty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos completos del formulario
      await registerUser(formData);
      alert('Registro exitoso');
      navigate('/login');  // Redirige a la página de login después de registrar
    } catch (error) {
      alert('Error en el registro');
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>MarTutors</h1>
          <p>Crea una cuenta para continuar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}  // Accede a name desde formData
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}  // Accede a email desde formData
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}  // Accede a password desde formData
            onChange={handleChange}
            required
          />
          <select
            name="user_type"
            value={formData.user_type}  // Accede a user_type desde formData
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu tipo de usuario</option>
            <option value="estudiante">Estudiante</option>
            <option value="egresado">Egresado</option>
            <option value="profesor">Profesor</option>
          </select>

          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu facultad</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </select>

          <select
            name="career"
            value={formData.career}
            onChange={handleChange}
            required
            disabled={!formData.faculty} // Deshabilitar si no se selecciona facultad
          >
            <option value="">Selecciona tu carrera</option>
            {careers.map((career) => (
              <option key={career.id} value={career.name}>
                {career.name}
              </option>
            ))}
          </select>
          
          <button type="submit" className="login-btn">Registrarse</button>
        </form>
        <div className="login-footer">
          <span>¿Ya tienes una cuenta?</span>
          <button onClick={() => navigate('/login')} className="register-btn">
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
