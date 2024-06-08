import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-category')({
  component: Category,
})

function Category() {
  return <div className="p-2">Hello from Category!</div>
}