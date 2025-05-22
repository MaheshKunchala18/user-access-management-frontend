import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">
          &copy; {year} User Access Management System | Built with <FontAwesomeIcon icon={faHeart} className="text-danger" /> using React & Node.js
        </p>
      </Container>
    </footer>
  );
};

export default Footer; 