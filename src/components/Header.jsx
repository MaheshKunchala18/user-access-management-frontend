import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  });

  useEffect(() => {
    // Whenever route changes, refresh auth state from localStorage
    setAuth({ token: localStorage.getItem('token'), role: localStorage.getItem('role') });
    // Listen for storage events from other tabs
    const syncAuth = () => setAuth({ token: localStorage.getItem('token'), role: localStorage.getItem('role') });
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null });
    window.location.href = '/login';
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faUserShield} className="me-2" />
          User Access Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {!auth.token && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
            {!auth.token && <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>}
            {auth.token && auth.role === 'Admin' && <Nav.Link as={NavLink} to="/create-software">Create Software</Nav.Link>}
            {auth.token && auth.role === 'Manager' && <Nav.Link as={NavLink} to="/pending-requests">Pending Requests</Nav.Link>}
            {auth.token && auth.role === 'Employee' && <Nav.Link as={NavLink} to="/request-access">Request Access</Nav.Link>}
            {auth.token && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 