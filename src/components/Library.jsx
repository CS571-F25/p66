import { useMemo, useState } from 'react'
import { Alert, Button, ButtonGroup, Col, Row } from 'react-bootstrap'
import LibraryBook from './LibraryBook'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'TBR', value: 'tbr' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' }
]

export default function Library({ library, onUpdateStatus }) {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(() => {
    if (filter === 'all') {
      return library
    }
    return library.filter((book) => book.status === filter)
  }, [library, filter])

  return (
    <section className="py-4">
      <header className="mb-4">
        <p className="eyebrow text-uppercase small mb-1">Your saved books</p>
        <h1 className="mb-2">Library</h1>
        <p className="text-muted mb-0">
          This simple view keeps track of each title plus its reading status and any review snippets you have
          started during the prototype phase.
        </p>
      </header>
      <ButtonGroup className="mb-3 flex-wrap">
        {filters.map((item) => (
          <Button
            key={item.value}
            variant={filter === item.value ? 'primary' : 'outline-secondary'}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
      {visible.length === 0 ? (
        <Alert variant="info">No books match that filter yet.</Alert>
      ) : (
        <Row className="g-3">
          {visible.map((book) => (
            <Col md={6} key={book.id}>
              <LibraryBook book={book} onUpdate={onUpdateStatus} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}
