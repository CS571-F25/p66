import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Stack } from 'react-bootstrap'

export default function Account({ profile, onSaveProfile, libraryCount }) {
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSaveProfile({
      name: name.trim() || 'Guest Reader',
      email
    })
    setMessage('Profile saved. Your library will stay cached on this device.')
  }

  return (
    <section className="py-4">
      <header className="mb-4">
        <p className="eyebrow text-uppercase small mb-1">Account</p>
        <h1 className="mb-2">Personalize your tracker</h1>
        <p className="text-muted mb-0">
          Set your display name and contact email. The prototype stores your profile and library locally so it is
          ready next time you sign in on this device.
        </p>
      </header>
      <Row className="g-3">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Sign in locally</Card.Title>
              <Card.Text className="text-muted">
                This form simulates a simple login flow by persisting your data to your browser. Your name also
                appears on reviews you leave.
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name-input">
                  <Form.Label>Display name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email-input">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  <Form.Text className="text-muted">Optional; stored only in your browser for now.</Form.Text>
                </Form.Group>
                <Stack direction="horizontal" gap={3} className="align-items-center">
                  <Button type="submit" variant="primary">
                    Save profile
                  </Button>
                  {message && <span className="text-success small" role="status">{message}</span>}
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>What is stored?</Card.Title>
              <Card.Text className="text-muted">
                Your profile and library are saved to local storage. Clearing your browser data will remove them,
                but they will stay put when you refresh or return later.
              </Card.Text>
              <Alert variant="info" className="mb-0">
                <p className="mb-1 fw-bold">Quick summary</p>
                <ul className="mb-0 ps-3 small text-muted">
                  <li>Name on file: {profile.name}</li>
                  <li>Books saved: {libraryCount}</li>
                  <li>Email: {profile.email || 'Not added'}</li>
                </ul>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}
