import TransactionHistory, { Transaction } from '../TransactionHistory'

export default function TransactionHistoryExample() {
  // todo: remove mock functionality
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      amount: 3200.00,
      description: "Monthly Salary",
      category: "Salary",
      date: new Date(2024, 11, 1)
    },
    {
      id: "2",
      type: "expense",
      amount: 85.50,
      description: "Grocery Shopping",
      category: "Food & Dining",
      date: new Date(2024, 11, 3)
    },
    {
      id: "3",
      type: "transfer",
      amount: 200.00,
      description: "Dinner split",
      recipientEmail: "sarah@example.com",
      date: new Date(2024, 11, 5)
    },
    {
      id: "4",
      type: "expense",
      amount: 45.99,
      description: "Netflix Subscription",
      category: "Entertainment",
      date: new Date(2024, 11, 8)
    },
    {
      id: "5",
      type: "income",
      amount: 1500.00,
      description: "Freelance Project",
      category: "Freelance",
      date: new Date(2024, 11, 10)
    }
  ]

  return (
    <div className="p-6 max-w-2xl">
      <TransactionHistory transactions={mockTransactions} />
    </div>
  )
}