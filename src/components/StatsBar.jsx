import { Card, Col, Row } from 'react-bootstrap'

export default function StatsBar({ stats }) {
  const items = [
    { label: 'Books tracked', value: stats.total },
    { label: 'Completed', value: `${stats.completed} (${stats.completionRate}%)` },
    { label: 'Average rating', value: stats.averageRating ?? '—' },
    { label: 'Reviews logged', value: stats.reviewCount }
  ]

  return (
    <Row className="g-3 mb-4" aria-label="Library stats">
      {items.map((item) => (
        <Col md={3} sm={6} key={item.label}>
          <Card className="shadow-sm h-100 border-0 stat-card">
            <Card.Body>
              <p className="text-uppercase small text-muted mb-1">{item.label}</p>
              <p className="h4 mb-0">{item.value}</p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
