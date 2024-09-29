import { createLazyFileRoute } from '@tanstack/react-router'
import { Cafe } from '../components/cafe'

export const Route = createLazyFileRoute('/cafe')({
  component: Cafe,
})
