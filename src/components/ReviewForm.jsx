import { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(null)
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!rating) {
      setError('Select a rating to save your review.')
      return
    }
    setError('')
    onSubmit({
      reviewer: 'You',
      rating,
      text: text.trim()
    })
    setText('')
    setRating(null)
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-2">
      <Form.Label htmlFor="review-text">Add a quick review</Form.Label>
      <Stack gap={2}>
        <div>
          <Form.Label className="small mb-1" id="rating-label">
            Rating
          </Form.Label>
          <Stack direction="horizontal" gap={2} aria-labelledby="rating-label">
            {[1, 2, 3, 4, 5].map((value) => (
              <Form.Check
                inline
                key={value}
                type="radio"
                id={`rating-${value}`}
                label={`${value} star${value > 1 ? 's' : ''}`}
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
            ))}
          </Stack>
        </div>
        <Form.Group controlId="review-text">
          <Form.Label className="small">Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What stood out about this book?"
          />
        </Form.Group>
        {error && (
          <div className="text-danger small" role="alert">
            {error}
          </div>
        )}
        <Button type="submit" variant="primary">
          Save review
        </Button>
      </Stack>
    </Form>
  )
}
