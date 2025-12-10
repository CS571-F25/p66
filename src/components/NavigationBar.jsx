import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function NavigationBar({ profileName = 'Reader' }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
          Book Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/library">
              Library
            </Nav.Link>
            <Nav.Link as={NavLink} to="/account">
              Account
            </Nav.Link>
          </Nav>
          <Navbar.Text className="ms-lg-3 text-muted small">Signed in as {profileName}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
