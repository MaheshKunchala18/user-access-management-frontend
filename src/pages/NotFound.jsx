import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="text-center py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <FontAwesomeIcon icon={faFaceSadTear} size="5x" className="text-muted mb-4" />
            <h1 className="display-4 mb-4">404 - Page Not Found</h1>
            <p className="lead mb-5">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            <Button as={Link} to="/" variant="primary" size="lg" className="btn-rounded">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default NotFound; 