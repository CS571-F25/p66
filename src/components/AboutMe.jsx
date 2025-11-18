import { Card, Col, Row } from 'react-bootstrap'

const milestones = [
  {
    title: 'Routing in place',
    detail: 'Three routed views (Home, Library, About) prove the navigation structure required by the spec.'
  },
  {
    title: 'Bootstrap styling',
    detail: 'Navigation, cards, and layout rely on React Bootstrap for a clean UI during prototyping.'
  },
  {
    title: 'Open Library integration',
    detail: 'The search widget makes real API calls so users can add genuine titles to their queue.'
  }
]

export default function AboutMe() {
  return (
    <section className="py-4">
      <header className="mb-4">
        <p className="eyebrow text-uppercase small">Project overview</p>
        <h1>About this build</h1>
      </header>
      <Row className="g-3">
        {milestones.map((item) => (
          <Col md={4} key={item.title}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-muted">{item.detail}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}
