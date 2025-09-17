import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, ArrowUpDown } from "lucide-react";

interface QuickActionsProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
  onTransferMoney: () => void;
}

export default function QuickActions({ onAddIncome, onAddExpense, onTransferMoney }: QuickActionsProps) {
  const actions = [
    {
      title: "Add Income",
      description: "Record money received",
      icon: Plus,
      color: "bg-chart-1 hover:bg-chart-1/90",
      onClick: onAddIncome,
      testId: "button-add-income"
    },
    {
      title: "Add Expense",
      description: "Track money spent",
      icon: Minus,
      color: "bg-destructive hover:bg-destructive/90",
      onClick: onAddExpense,
      testId: "button-add-expense"
    },
    {
      title: "Transfer Money",
      description: "Send to another user",
      icon: ArrowUpDown,
      color: "bg-chart-3 hover:bg-chart-3/90",
      onClick: onTransferMoney,
      testId: "button-transfer-money"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover-elevate"
              onClick={action.onClick}
              data-testid={action.testId}
            >
              <div className={`p-2 rounded-md ${action.color} mr-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}