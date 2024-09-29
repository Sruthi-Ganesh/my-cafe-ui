import { createLazyFileRoute } from '@tanstack/react-router'
import { Employee } from '../components/employee'

type CafeFilter = {
  cafeId: string
  cafeName: string
}

export const Route = createLazyFileRoute('/')({
  component: Employee,
})
