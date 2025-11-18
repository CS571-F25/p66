import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'

const DEFAULT_QUERY = 'productivity'

export default function BookSearch({ onAddBook }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    searchBooks(DEFAULT_QUERY)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchBooks = async (term) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(term)}&limit=6`)
      if (!response.ok) {
        throw new Error('Open Library search failed.')
      }
      const data = await response.json()
      const mapped = data.docs.map((doc) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name?.join(', ') ?? 'Unknown',
        pages: doc.number_of_pages_median ?? 'n/a',
        year: doc.first_publish_year ?? 'n/a'
      }))
      setResults(mapped)
    } catch (err) {
      setError(err.message || 'Unable to search right now.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!query.trim()) {
      return
    }
    searchBooks(query.trim())
  }

  return (
    <section className="mb-5">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex flex-column gap-2 mb-3">
            <h2 className="mb-0">Search Open Library</h2>
            <p className="text-muted mb-0">Find a title, then add it to your personal queue.</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" /> Searching
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </InputGroup>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row className="g-3">
            {results.map((book) => (
              <Col md={4} key={book.id}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="text-muted small mb-2">{book.author}</Card.Subtitle>
                    <p className="text-muted small mb-4">
                      Pages: {book.pages}
                      <br />
                      Year: {book.year}
                    </p>
                    <Button
                      variant="outline-primary"
                      className="mt-auto"
                      onClick={() => onAddBook(book)}
                    >
                      Add to library
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </section>
  )
}
