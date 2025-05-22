import { useState } from 'react';
import { Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, faPencil, faTrash, faExclamationCircle, 
  faInfoCircle, faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

import TodoForm from './TodoForm';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  const [editingTodo, setEditingTodo] = useState(null);

  const handleStatusChange = (todo) => {
    const updatedTodo = {
      ...todo,
      status: todo.status === 'pending' ? 'completed' : 'pending'
    };
    onUpdate(todo._id, updatedTodo);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (updatedTodo) => {
    onUpdate(editingTodo._id, updatedTodo);
    setEditingTodo(null);
  };

  const renderPriorityBadge = (priority) => {
    const config = {
      high: { variant: 'danger', icon: faExclamationCircle },
      medium: { variant: 'warning', icon: faInfoCircle },
      low: { variant: 'success', icon: faCheckCircle }
    };
    
    const { variant, icon } = config[priority] || config.medium;
    
    return (
      <Badge bg={variant} className="ms-2">
        <FontAwesomeIcon icon={icon} className="me-1" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  if (todos.length === 0) {
    return (
      <Alert variant="info">
        <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
        No todos found. Add a new todo to get started!
      </Alert>
    );
  }

  return (
    <AnimatePresence>
      {editingTodo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4"
        >
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Edit Todo</Card.Title>
              <TodoForm
                todo={editingTodo}
                onSubmit={handleUpdate}
                onCancel={() => setEditingTodo(null)}
              />
            </Card.Body>
          </Card>
        </motion.div>
      )}

      {todos.map((todo) => (
        <motion.div
          key={todo._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <Card 
            className={`todo-card priority-${todo.priority} ${todo.status === 'completed' ? 'bg-light' : ''}`}
          >
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12} md={8}>
                  <div className="d-flex align-items-center">
                    <h5 
                      className={`mb-0 ${todo.status === 'completed' ? 'text-muted text-decoration-line-through' : ''}`}
                    >
                      {todo.title}
                      {renderPriorityBadge(todo.priority)}
                      {todo.status === 'completed' && (
                        <Badge bg="secondary" className="ms-2">Completed</Badge>
                      )}
                    </h5>
                  </div>
                  {todo.description && (
                    <p className={`mt-2 mb-0 ${todo.status === 'completed' ? 'text-muted' : ''}`}>
                      {todo.description}
                    </p>
                  )}
                  <small className="text-muted">
                    Created: {new Date(todo.createdAt).toLocaleString()}
                  </small>
                </Col>
                <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                  <Button
                    variant={todo.status === 'completed' ? 'outline-secondary' : 'outline-success'}
                    size="sm"
                    className="me-2"
                    onClick={() => handleStatusChange(todo)}
                  >
                    <FontAwesomeIcon icon={faCheck} className="me-1" />
                    {todo.status === 'completed' ? 'Mark Pending' : 'Complete'}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(todo)}
                  >
                    <FontAwesomeIcon icon={faPencil} className="me-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(todo._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default TodoList; 