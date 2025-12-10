import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer py-4 mt-auto border-top bg-white">
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <div className="text-muted small">Built for CS571 · Book Tracker</div>
        <Nav className="gap-3 align-items-center">
          <Nav.Link as={NavLink} to="/" className="small">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/library" className="small">
            Library
          </Nav.Link>
          <Nav.Link as={NavLink} to="/account" className="small">
            Account
          </Nav.Link>
        </Nav>
      </Container>
    </footer>
  )
}
