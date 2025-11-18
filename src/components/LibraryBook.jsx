import { Badge, Card, Dropdown } from 'react-bootstrap'

const statusLabels = {
  tbr: 'To be read',
  'in-progress': 'In progress',
  completed: 'Completed'
}

export default function LibraryBook({ book, onUpdate }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1">{book.title}</Card.Title>
            <Card.Subtitle className="text-muted small">{book.author}</Card.Subtitle>
          </div>
          <Badge bg="secondary">{statusLabels[book.status]}</Badge>
        </div>
        <p className="text-muted small mb-1">Pages: {book.pages ?? 'n/a'}</p>
        <p className="text-muted small mb-3">Reviews: {book.reviews.length}</p>
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="outline-primary">
            Update status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.entries(statusLabels).map(([value, label]) => (
              <Dropdown.Item key={value} active={book.status === value} onClick={() => onUpdate(book.id, value)}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {book.reviews.length > 0 && (
          <blockquote className="blockquote small text-muted mb-0">
            “{book.reviews[0].text}” — {book.reviews[0].reviewer}, {book.reviews[0].rating}★
          </blockquote>
        )}
      </Card.Body>
    </Card>
  )
}
