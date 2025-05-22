import { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { motion } from 'framer-motion'

function RequestAccess() {
  const [softwares, setSoftwares] = useState([])
  const [state, setState] = useState({ softwareId: '', accessType: 'Read', reason: '' })
  const [msg, setMsg] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const { data } = await axios.get('/api/software', { headers: { Authorization: `Bearer ${token}` } })
        setSoftwares(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSoftwares()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/requests', state, { headers: { Authorization: `Bearer ${token}` } })
      setMsg('Request submitted')
      setState({ softwareId: '', accessType: 'Read', reason: '' })
    } catch (err) {
      setMsg(err.response?.data?.message || 'Server error')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <Card.Title className="mb-3">Request Access</Card.Title>
          {msg && <div className="alert alert-info">{msg}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="software">
              <Form.Label>Software</Form.Label>
              <Form.Select value={state.softwareId} onChange={(e) => setState({ ...state, softwareId: e.target.value })} required>
                <option value="">Select software</option>
                {softwares.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="accessType">
              <Form.Label>Access Type</Form.Label>
              <Form.Select value={state.accessType} onChange={(e) => setState({ ...state, accessType: e.target.value })}>
                <option value="Read">Read</option>
                <option value="Write">Write</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control as="textarea" rows={3} value={state.reason} onChange={(e) => setState({ ...state, reason: e.target.value })} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default RequestAccess 