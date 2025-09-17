import { useState } from 'react'
import TransactionForm, { TransactionType } from '../TransactionForm'
import { Button } from '@/components/ui/button'

export default function TransactionFormExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<TransactionType>('income')

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => { setType('income'); setIsOpen(true); }}>
          Open Income Form
        </Button>
        <Button onClick={() => { setType('expense'); setIsOpen(true); }}>
          Open Expense Form
        </Button>
        <Button onClick={() => { setType('transfer'); setIsOpen(true); }}>
          Open Transfer Form
        </Button>
      </div>
      
      <TransactionForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={type}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    </div>
  )
}