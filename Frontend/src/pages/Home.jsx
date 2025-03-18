import { Link } from 'react-router-dom';
import '../styles/home.css';  // Estilos de la página de inicio

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">MarTutors</h1>
      <p className="slogan">Conecta, Aprende, Crece</p>

      <div className="button-container">
        <Link to="/login" className="button">Iniciar sesión</Link>
        <Link to="/register" className="button">Registrar</Link>
      </div>
    </div>
  );
};

export default Home;
