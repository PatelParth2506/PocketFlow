import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  previousBalance?: number;
}

export default function BalanceCard({ balance, previousBalance }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const balanceChange = previousBalance ? balance - previousBalance : 0;
  const isPositiveChange = balanceChange >= 0;

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(!isVisible)}
          data-testid="button-toggle-balance-visibility"
        >
          {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-mono font-bold" data-testid="text-balance">
            {isVisible ? formatCurrency(balance) : "••••••"}
          </div>
          {previousBalance && isVisible && (
            <div className="flex items-center space-x-2 text-sm">
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-chart-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={isPositiveChange ? "text-chart-1" : "text-destructive"}
                data-testid="text-balance-change"
              >
                {isPositiveChange ? "+" : ""}{formatCurrency(balanceChange)} from last month
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}