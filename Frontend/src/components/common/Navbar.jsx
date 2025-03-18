import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const onLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
          Iniciar Sesión
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link btn-register" onClick={() => setMobileMenuOpen(false)}>
          Registrarse
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className="nav-item">
        <Link to="/find-tutor" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
          Buscar Tutor
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/groups" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
          Grupos
        </Link>
      </li>
      <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle">
          {user && user.name}
        </button>
        <div className="dropdown-menu">
          <Link to="/profile" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
            Perfil
          </Link>
          <div className="dropdown-divider"></div>
          <button onClick={onLogout} className="dropdown-item">
            Cerrar Sesión
          </button>
        </div>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          MarTutors
        </Link>

        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={mobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/subjects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Materias
            </Link>
          </li>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;