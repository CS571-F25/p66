import { ListGroup } from 'react-bootstrap'

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted small mb-0">No reviews yet — add your first thoughts.</p>
  }

  return (
    <ListGroup variant="flush" className="border rounded">
      {reviews.map((review, index) => (
        <ListGroup.Item key={`${review.reviewer}-${index}`}>
          <p className="mb-1 fw-semibold">
            {review.reviewer}{' '}
            <span className="text-muted small" aria-label={`Rated ${review.rating} out of 5`}>
              {review.rating}★
            </span>
          </p>
          <p className="mb-0 small text-muted">{review.text || 'No comment provided.'}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
