import { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function CreateSoftware() {
  const navigate = useNavigate()
  const [state, setState] = useState({ name: '', description: '', accessLevels: [] })
  const availableLevels = ['Read', 'Write', 'Admin']
  const [msg, setMsg] = useState('')

  const handleCheckbox = (level) => {
    setState((prev) => {
      const exists = prev.accessLevels.includes(level)
      const newLevels = exists ? prev.accessLevels.filter((l) => l !== level) : [...prev.accessLevels, level]
      return { ...prev, accessLevels: newLevels }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('/api/software', state, { headers: { Authorization: `Bearer ${token}` } })
      setMsg('Software created')
      setState({ name: '', description: '', accessLevels: [] })
    } catch (err) {
      setMsg(err.response?.data?.message || 'Server error')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <Card.Title className="mb-3">Create Software</Card.Title>
          {msg && <div className="alert alert-info">{msg}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Access Levels</Form.Label>
              <div>
                {availableLevels.map((level) => (
                  <Form.Check
                    inline
                    key={level}
                    label={level}
                    checked={state.accessLevels.includes(level)}
                    onChange={() => handleCheckbox(level)}
                  />
                ))}
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">Create</Button>{' '}
            <Button variant="secondary" onClick={() => navigate('/')}>Home</Button>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default CreateSoftware 