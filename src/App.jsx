import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AnimatePresence } from 'framer-motion'
import './App.css'

// Pages
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreateSoftware from './pages/CreateSoftware'
import RequestAccess from './pages/RequestAccess'
import PendingRequests from './pages/PendingRequests'
import NotFound from './pages/NotFound'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container className="main-content py-4">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-software" element={<CreateSoftware />} />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/pending-requests" element={<PendingRequests />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Container>
      <Footer />
    </div>
  )
}

export default App
