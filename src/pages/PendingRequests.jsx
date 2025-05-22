import { useState, useEffect } from 'react'
import { Card, Button, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import { motion } from 'framer-motion'

function PendingRequests() {
  const [requests, setRequests] = useState([])
  const token = localStorage.getItem('token')

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/requests/pending', { headers: { Authorization: `Bearer ${token}` } })
      setRequests(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAction = async (id, status) => {
    try {
      await axios.patch(`/api/requests/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } })
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card>
        <Card.Body>
          <Card.Title>Pending Requests</Card.Title>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Software</th>
                <th>Access Type</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.user.username}</td>
                  <td>{req.software.name}</td>
                  <td>{req.accessType}</td>
                  <td>{req.reason}</td>
                  <td>
                    <Button size="sm" variant="success" className="me-2" onClick={() => handleAction(req.id, 'Approved')}>Approve</Button>
                    <Button size="sm" variant="danger" onClick={() => handleAction(req.id, 'Rejected')}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default PendingRequests 