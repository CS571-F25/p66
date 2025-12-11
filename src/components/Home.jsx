import { Card, Col, Row } from 'react-bootstrap'
import BookSearch from './BookSearch'
import HeroBanner from './HeroBanner'
import ReadingGoal from './ReadingGoal'
import StatsBar from './StatsBar'
import StatusBadge from './StatusBadge'

export default function Home({ stats, library, onAddBook, goal, onUpdateGoal, profile }) {
  return (
    <section className="py-4">
      <HeroBanner stats={stats} profile={profile} />
      <StatsBar stats={stats} />
      <Row className="g-3 align-items-stretch mb-4">
        <Col lg={8}>
          <BookSearch onAddBook={onAddBook} />
        </Col>
        <Col lg={4}>
          <ReadingGoal completedCount={stats.completed} goal={goal} onUpdateGoal={onUpdateGoal} />
        </Col>
      </Row>
      {library.length > 0 && (
        <section aria-labelledby="latest-additions-heading">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <p className="text-uppercase small text-muted mb-1">Snapshot</p>
              <h2 id="latest-additions-heading" className="mb-0">
                Latest additions
              </h2>
            </div>
            <p className="text-muted small mb-0">Click any book to update its status in the library view.</p>
          </div>
          <Row className="g-3">
            {library.slice(0, 3).map((book) => (
              <Col md={4} key={book.id}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="fs-5">{book.title}</Card.Title>
                    <Card.Subtitle className="text-muted small">{book.author}</Card.Subtitle>
                    <div className="d-flex align-items-center gap-2 mt-3">
                      <StatusBadge status={book.status} />
                      {book.status === 'completed' ? (
                        <span className="text-muted small">
                          {book.reviews.length > 0 ? `${book.reviews.length} review(s)` : 'No reviews yet'}
                        </span>
                      ) : (
                        <span className="text-muted small">Reviews unlock after completion</span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </section>
  )
}
