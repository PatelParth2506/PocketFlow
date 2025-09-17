import QuickActions from '../QuickActions'

export default function QuickActionsExample() {
  return (
    <div className="p-6 max-w-md">
      <QuickActions
        onAddIncome={() => console.log('Add income triggered')}
        onAddExpense={() => console.log('Add expense triggered')}
        onTransferMoney={() => console.log('Transfer money triggered')}
      />
    </div>
  )
}