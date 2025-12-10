import { Badge } from 'react-bootstrap'

const statusLabels = {
  tbr: { text: 'To be read', variant: 'secondary' },
  'in-progress': { text: 'In progress', variant: 'info' },
  completed: { text: 'Completed', variant: 'success' }
}

export default function StatusBadge({ status }) {
  const config = statusLabels[status] ?? { text: 'Unknown', variant: 'secondary' }
  return (
    <Badge bg={config.variant} aria-label={`Status: ${config.text}`}>
      {config.text}
    </Badge>
  )
}
