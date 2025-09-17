import SummaryCards from '../SummaryCards'

export default function SummaryCardsExample() {
  return (
    <div className="p-6">
      <SummaryCards
        data={{
          totalIncome: 25480.50,
          totalExpenses: 8920.25,
          totalTransfers: 1540.00,
          netWorth: 15020.25
        }}
      />
    </div>
  )
}