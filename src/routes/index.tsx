import { createFileRoute } from '@tanstack/react-router'
import { Employee } from '../components/employee'

type CafeFilter = {
  cafeId: string,
  cafeName: string
}

export const Route = createFileRoute('/')({
  component: Employee,
  validateSearch: (search: Record<string, unknown>): CafeFilter => {
    return {
      cafeId: search.cafeId as string,
      cafeName: search.cafeName as string
    }
  },
})
