import { useMemo, useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import FilterBar from './FilterBar'
import LibraryBook from './LibraryBook'

export default function Library({ library, onUpdateStatus, onAddReview }) {
  const [filter, setFilter] = useState('all')
  const [showReviewedOnly, setShowReviewedOnly] = useState(false)

  const visible = useMemo(() => {
    let filtered = library
    if (filter !== 'all') {
      filtered = filtered.filter((book) => book.status === filter)
    }
    if (showReviewedOnly) {
      filtered = filtered.filter((book) => book.reviews.length > 0)
    }
    return filtered
  }, [library, filter, showReviewedOnly])

  return (
    <section className="py-4">
      <header className="mb-4">
        <p className="eyebrow text-uppercase small mb-1">Your saved books</p>
        <h1 className="mb-2">Library</h1>
        <p className="text-muted mb-0">
          Track each title plus its reading status, reviews, and ratings. Filter by status or show only books that
          have feedback.
        </p>
      </header>
      <FilterBar
        filter={filter}
        onChangeFilter={setFilter}
        showReviewedOnly={showReviewedOnly}
        onToggleReviewed={setShowReviewedOnly}
      />
      {visible.length === 0 ? (
        <Alert variant="info">No books match that filter yet.</Alert>
      ) : (
        <Row className="g-3">
          {visible.map((book) => (
            <Col md={6} key={book.id}>
              <LibraryBook book={book} onUpdate={onUpdateStatus} onAddReview={onAddReview} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}
