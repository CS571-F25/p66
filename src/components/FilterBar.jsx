import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'TBR', value: 'tbr' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' }
]

export default function FilterBar({ filter, onChangeFilter, showReviewedOnly, onToggleReviewed }) {
  return (
    <Stack className="flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
      <ButtonGroup aria-label="Filter books by status">
        {filters.map((item) => (
          <Button
            key={item.value}
            variant={filter === item.value ? 'primary' : 'outline-secondary'}
            onClick={() => onChangeFilter(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
      <Form.Check
        type="switch"
        id="review-filter"
        label="Only show books with a review"
        checked={showReviewedOnly}
        onChange={(event) => onToggleReviewed(event.target.checked)}
      />
    </Stack>
  )
}
