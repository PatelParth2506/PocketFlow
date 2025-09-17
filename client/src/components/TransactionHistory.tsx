import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button"; // Import Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
export interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  category?: string;
  recipientEmail?: string;
  createdAt: Date;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [filterType, setFilterType] = useState<"all" | "income" | "expense" | "transfer">("all"); // Filter state

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObj);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="h-4 w-4 text-chart-1" />;
      case "expense":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case "transfer":
        return <ArrowUpDown className="h-4 w-4 text-chart-3" />;
      default:
        return null;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-chart-1";
      case "expense":
        return "text-destructive";
      case "transfer":
        return "text-chart-3";
      default:
        return "text-foreground";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "income":
        return "default";
      case "expense":
        return "destructive";
      case "transfer":
        return "secondary";
      default:
        return "default";
    }
  };

  // Filtered transactions based on filterType
  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === "all") {
      return true;
    }
    return transaction.type === filterType;
  });

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No transactions yet</p>
            <p className="text-sm">Your transaction history will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> {/* Modified CardHeader */}
        <CardTitle>Transaction History</CardTitle>
        <div className="flex flex-wrap gap-2 justify-end md:flex-nowrap md:space-x-2"> {/* Filter buttons */}
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterType === "income" ? "default" : "outline"}
            onClick={() => setFilterType("income")}
            size="sm"
          >
            Income
          </Button>
          <Button
            variant={filterType === "expense" ? "default" : "outline"}
            onClick={() => setFilterType("expense")}
            size="sm"
          >
            Expense
          </Button>
          <Button
            variant={filterType === "transfer" ? "default" : "outline"}
            onClick={() => setFilterType("transfer")}
            size="sm"
          >
            Transfer
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 hover-elevate"
                data-testid={`transaction-${transaction.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium truncate" data-testid={`text-description-${transaction.id}`}>
                        {transaction.description}
                      </p>
                      <Badge variant={getBadgeVariant(transaction.type)} className="text-xs">
                        {transaction.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {transaction.category && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {transaction.category}
                        </span>
                      )}
                      {transaction.recipientEmail && (
                        <span className="text-xs text-muted-foreground">
                          to {transaction.recipientEmail}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-mono font-medium ${getAmountColor(transaction.type)}`} data-testid={`text-amount-${transaction.id}`}>
                    {transaction.type === "expense" || transaction.type === "transfer" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}