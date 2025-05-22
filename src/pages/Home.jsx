import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // If user already logged in redirect them based on role
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token && role) {
      switch (role) {
        case 'Admin':
          navigate('/create-software')
          break
        case 'Manager':
          navigate('/pending-requests')
          break
        default:
          navigate('/request-access')
      }
    }
  }, [navigate])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title as="h1" className="mb-3">User Access Management System</Card.Title>
                <Card.Text className="mb-4">
                  A simple platform that lets employees request access to internal software, managers approve or reject those
                  requests, and admins manage the list of available software. Built with React, Node.js, Express and PostgreSQL.
                </Card.Text>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" size="lg" onClick={() => navigate('/login')}>Already have an account? Log In</Button>
                  <Button variant="outline-primary" size="lg" onClick={() => navigate('/signup')}>Don't have an account? Sign Up</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default Home 