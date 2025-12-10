import { Badge, Card, Col, Row } from 'react-bootstrap'

const highlights = [
  'Search the Open Library catalog in real time',
  'Tag every book with TBR, In Progress, or Completed',
  'Log a quick reaction with a 1–5 star rating summary'
]

export default function HeroBanner({ stats, profile }) {
  return (
    <Card className="hero-card shadow-sm mb-4">
      <Card.Body>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <Badge bg="primary" className="mb-3">
              Welcome back, {profile?.name || 'reader'}
            </Badge>
            <h1 className="mb-3">Keep tabs on your reading life</h1>
            <p className="lead text-muted">
              Book Tracker is a lightweight tracker that helps you collect titles, mark your progress, and leave a
              bite-sized review for classmates to read. It is powered by React, React Router, and React Bootstrap.
            </p>
            <ul className="text-muted small ps-3">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Col>
          <Col lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <p className="text-uppercase small text-muted mb-1">Library snapshot</p>
                <h2 className="display-6 fw-bold">{stats.total} books</h2>
                <Row className="g-3">
                  <Col xs={4}>
                    <MiniStat label="TBR" value={stats.tbr} />
                  </Col>
                  <Col xs={4}>
                    <MiniStat label="In progress" value={stats['in-progress']} />
                  </Col>
                  <Col xs={4}>
                    <MiniStat label="Done" value={stats.completed} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="mini-stat text-center p-3 border rounded">
      <p className="small text-muted mb-1">{label}</p>
      <p className="fw-bold fs-4 mb-0">{value}</p>
    </div>
  )
}
