import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpDown, DollarSign } from "lucide-react";

export interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  totalTransfers: number;
  netWorth: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const cards = [
    {
      title: "Total Income",
      value: data?.totalIncome,
      icon: TrendingUp,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      testId: "card-income"
    },
    {
      title: "Total Expenses",
      value: data?.totalExpenses,
      icon: TrendingDown,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      testId: "card-expenses"
    },
    {
      title: "Transfers Sent",
      value: data?.totalTransfers,
      icon: ArrowUpDown,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      testId: "card-transfers"
    },
    {
      title: "Net Worth",
      value: data?.netWorth,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
      testId: "card-net-worth"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} data-testid={card.testId}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-md ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-mono font-bold ${card.color}`} data-testid={`text-${card.testId.split('-')[1]}`}>
                {formatCurrency(Math.abs(card.value))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.title === "Total Expenses" || card.title === "Transfers Sent" ? "Outgoing" : "Total"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}