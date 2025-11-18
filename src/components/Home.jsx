import { Card, Col, Row } from 'react-bootstrap'
import HeroBanner from './HeroBanner'
import BookSearch from './BookSearch'

export default function Home({ stats, library, onAddBook }) {
  return (
    <section className="py-4">
      <HeroBanner stats={stats} />
      <BookSearch onAddBook={onAddBook} />
      {library.length > 0 && (
        <section>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <p className="text-uppercase small text-muted mb-1">Snapshot</p>
              <h2 className="mb-0">Latest additions</h2>
            </div>
          </div>
          <Row className="g-3">
            {library.slice(0, 3).map((book) => (
              <Col md={4} key={book.id}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="fs-5">{book.title}</Card.Title>
                    <Card.Subtitle className="text-muted small">{book.author}</Card.Subtitle>
                    <p className="text-muted small mb-0 mt-3">Status: {book.status.toUpperCase()}</p>
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
