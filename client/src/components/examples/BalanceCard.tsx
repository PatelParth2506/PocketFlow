import BalanceCard from '../BalanceCard'

export default function BalanceCardExample() {
  return (
    <div className="p-6 max-w-2xl">
      <BalanceCard
        balance={15420.75}
        previousBalance={14850.25}
      />
    </div>
  )
}