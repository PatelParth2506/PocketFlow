import Dashboard from '../Dashboard'

export default function DashboardExample() {
  return (
    <Dashboard
      user={{
        name: "John Doe",
        email: "john.doe@example.com"
      }}
    />
  )
}