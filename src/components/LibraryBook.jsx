import { useMemo, useState } from 'react'
import { Button, Card, Dropdown, Stack } from 'react-bootstrap'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'
import StatusBadge from './StatusBadge'

const statusLabels = {
  tbr: 'To be read',
  'in-progress': 'In progress',
  completed: 'Completed'
}

export default function LibraryBook({ book, onUpdate, onAddReview, onRemove }) {
  const [showReviews, setShowReviews] = useState(false)

  const averageRating = useMemo(() => {
    if (!book.reviews.length) return null
    const total = book.reviews.reduce((sum, review) => sum + review.rating, 0)
    return (total / book.reviews.length).toFixed(1)
  }, [book.reviews])

  const canReview = book.status === 'completed'

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1">{book.title}</Card.Title>
            <Card.Subtitle className="text-muted small">{book.author}</Card.Subtitle>
            <p className="text-muted small mb-0">Pages: {book.pages ?? 'n/a'}</p>
          </div>
          <StatusBadge status={book.status} />
        </div>
        <Stack direction="horizontal" className="flex-wrap gap-2 align-items-center">
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
          <p className="text-muted small mb-0">Reviews: {canReview ? book.reviews.length : 'Not yet'}</p>
          <p className="text-muted small mb-0">
            Average rating: {canReview && averageRating ? `${averageRating}★` : '—'}
          </p>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => {
              const confirmed = window.confirm(`Remove "${book.title}" from your library?`)
              if (confirmed) {
                onRemove(book.id)
              }
            }}
            aria-label={`Remove ${book.title} from library`}
          >
            Remove
          </Button>
          {canReview && (
            <Button
              size="sm"
              variant="outline-secondary"
              aria-expanded={showReviews}
              onClick={() => setShowReviews((value) => !value)}
            >
              {showReviews ? 'Hide reviews' : 'Show reviews'}
            </Button>
          )}
        </Stack>
        {canReview ? (
          <>
            {showReviews && <ReviewList reviews={book.reviews} />}
            <ReviewForm onSubmit={(review) => onAddReview(book.id, review)} />
          </>
        ) : (
          <p className="text-muted small mb-0">Mark this book as completed to log and view reviews.</p>
        )}
      </Card.Body>
    </Card>
  )
}
