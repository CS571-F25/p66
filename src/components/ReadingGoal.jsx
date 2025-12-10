import { useEffect, useState } from 'react'
import { Button, Card, Form, ProgressBar, Stack } from 'react-bootstrap'

export default function ReadingGoal({ completedCount, goal, onUpdateGoal }) {
  const [localGoal, setLocalGoal] = useState(goal)
  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem('reading-streak')
    return stored ? Number.parseInt(stored, 10) : 3
  })

  useEffect(() => {
    setLocalGoal(goal)
  }, [goal])

  useEffect(() => {
    localStorage.setItem('reading-streak', String(streak))
  }, [streak])

  const progress =
    localGoal > 0 ? Math.min(Math.round((completedCount / localGoal) * 100), 100) : 0

  const handleSubmit = (event) => {
    event.preventDefault()
    if (localGoal < 1) return
    onUpdateGoal(localGoal)
  }

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <p className="text-uppercase small text-muted mb-1">Yearly target</p>
            <h3 className="mb-1">Read {goal} books</h3>
            <p className="text-muted small mb-0">Completed {completedCount} so far</p>
          </div>
          <div className="text-end">
            <p className="mb-0 fw-bold">{progress}%</p>
            <small className="text-muted">progress</small>
          </div>
        </div>
        <ProgressBar now={progress} visuallyHidden label={`${progress}%`} aria-label="Reading goal progress" />
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Label htmlFor="goal-input">Update your yearly goal</Form.Label>
          <Stack direction="horizontal" gap={2}>
            <Form.Control
              id="goal-input"
              type="number"
              min={1}
              value={localGoal}
              onChange={(e) => setLocalGoal(Number.parseInt(e.target.value, 10) || 0)}
            />
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Stack>
        </Form>
        <div className="mt-3">
          <p className="text-uppercase small text-muted mb-1">Streak</p>
          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-secondary"
              size="sm"
              aria-label="Decrease reading streak"
              onClick={() => setStreak((value) => Math.max(0, value - 1))}
            >
              −
            </Button>
            <span className="fw-bold" aria-live="polite">
              {streak} days
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              aria-label="Increase reading streak"
              onClick={() => setStreak((value) => value + 1)}
            >
              +
            </Button>
          </Stack>
          <small className="text-muted d-block mt-1">Track how many consecutive days you read.</small>
        </div>
      </Card.Body>
    </Card>
  )
}
