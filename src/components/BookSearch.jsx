import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, InputGroup, Pagination, Row, Spinner } from 'react-bootstrap'

const DEFAULT_QUERY = 'productivity'
const RESULTS_PER_PAGE = 6

export default function BookSearch({ onAddBook }) {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    searchBooks(DEFAULT_QUERY)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchBooks = async (term, pageNumber = 1) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(term)}&limit=${RESULTS_PER_PAGE}&page=${pageNumber}`
      )
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
      const computedPages = Math.max(1, Math.ceil((data.numFound || RESULTS_PER_PAGE) / RESULTS_PER_PAGE))
      setTotalPages(computedPages)
      setPage(pageNumber)
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
    searchBooks(query.trim(), 1)
  }

  const pageNumbers = () => {
    const maxVisible = 5
    let start = Math.max(1, page - 2)
    let end = Math.min(totalPages, start + maxVisible - 1)
    start = Math.max(1, end - maxVisible + 1)

    const pages = []
    for (let i = start; i <= end; i += 1) {
      pages.push(i)
    }
    return pages
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
            <Form.Label className="visually-hidden" htmlFor="search-input">
              Search for a book
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="search-input"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-describedby="search-help"
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
            <Form.Text id="search-help" className="text-muted">
              Powered by Open Library. Results show top 6 matches.
            </Form.Text>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && results.length === 0 && <Alert variant="secondary">No results yet. Try a new search term.</Alert>}
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
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between mt-3">
              <p className="small text-muted mb-0">
                Page {page} of {totalPages}
              </p>
              <Pagination className="mb-0" aria-label="Search results pagination">
                <Pagination.Prev disabled={page === 1} onClick={() => searchBooks(query, page - 1)}>
                  Previous
                </Pagination.Prev>
                {pageNumbers().map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === page}
                    onClick={() => searchBooks(query, pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={page === totalPages}
                  onClick={() => searchBooks(query, page + 1)}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>
    </section>
  )
}
