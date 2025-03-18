import React, {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const Register = () => {
  const history = useHistory();
  const { register, isAuthenticated, error, clearError } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    userType: 'estudiante',
    faculty: '',
    career: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  const { name, email, password, password2, userType, faculty, career } = formData;

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
    
    if (password !== password2) {
      setAlertMessage('Las contraseñas no coinciden');
    } else if (password.length < 6) {
      setAlertMessage('La contraseña debe tener al menos 6 caracteres');
    } else {
      register({
        name,
        email,
        password,
        userType,
        faculty,
        career
      });
    }
  };

  // Lista de facultades de la UV en Veracruz
  const faculties = [
    'Facultad de Ingeniería',
    'Facultad de Administración',
    'Facultad de Ciencias Químicas',
    'Facultad de Medicina',
    'Facultad de Enfermería',
    'Facultad de Odontología',
    'Facultad de Pedagogía',
    'Facultad de Psicología',
    'Facultad de Comunicación',
    'Facultad de Derecho',
    'Otros'
  ];

  // Lista de carreras (simplificada)
  const careers = {
    'Facultad de Ingeniería': [
      'Ingeniería Civil',
      'Ingeniería Mecánica Eléctrica',
      'Ingeniería Naval',
      'Ingeniería Industrial'
    ],
    'Facultad de Administración': [
      'Administración',
      'Contaduría',
      'Sistemas Computacionales Administrativos'
    ],
    'Facultad de Ciencias Químicas': [
      'Ingeniería Química',
      'Química Farmacéutica Biológica'
    ],
    'Facultad de Medicina': ['Medicina'],
    'Facultad de Enfermería': ['Enfermería'],
    'Facultad de Odontología': ['Odontología'],
    'Facultad de Pedagogía': ['Pedagogía'],
    'Facultad de Psicología': ['Psicología'],
    'Facultad de Comunicación': ['Ciencias de la Comunicación'],
    'Facultad de Derecho': ['Derecho'],
    'Otros': ['Otra carrera']
  };

  return (
    <div className="register-container">
      <h1 className="text-center mb-4">Registro</h1>

      {alertMessage && (
        <div className="alert alert-danger">{alertMessage}</div>
      )}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        
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
            placeholder="ejemplo@estudiantes.uv.mx"
          />
          <small className="form-text text-muted">
            Preferentemente tu correo institucional UV
          </small>
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
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password2">Confirmar contraseña</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            className="form-control"
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="userType">Tipo de usuario</label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={onChange}
            className="form-control"
          >
            <option value="estudiante">Estudiante</option>
            <option value="egresado">Egresado</option>
            <option value="profesor">Profesor</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="faculty">Facultad</label>
          <select
            id="faculty"
            name="faculty"
            value={faculty}
            onChange={onChange}
            required
            className="form-control"
          >
            <option value="">-- Selecciona una facultad --</option>
            {faculties.map(fac => (
              <option key={fac} value={fac}>
                {fac}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="career">Carrera</label>
          <select
            id="career"
            name="career"
            value={career}
            onChange={onChange}
            required
            className="form-control"
            disabled={!faculty}
          >
            <option value="">-- Selecciona tu carrera --</option>
            {faculty &&
              careers[faculty] &&
              careers[faculty].map(car => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Registrarse
        </button>
      </form>
      
      <p className="text-center mt-3">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;