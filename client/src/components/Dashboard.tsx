import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BalanceCard from "./BalanceCard";
import SummaryCards from "./SummaryCards";
import { SummaryData } from "./SummaryCards";
import QuickActions from "./QuickActions";
import TransactionHistory, { Transaction } from "./TransactionHistory";
import TransactionForm, { TransactionType } from "./TransactionForm";
import { apiRequest, setCurrentUserId } from "../lib/queryClient";

interface DashboardProps {
  user: { id: string; name: string; email: string; avatar?: string };
}

export default function Dashboard({ user }: DashboardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<TransactionType>("income");
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentUserId(user.id);
  }, [user.id]);

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () => apiRequest("/api/transactions"),
  });

  // Sort transactions from latest to oldest
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Descending order
  });

  const { data: summaryData } = useQuery<SummaryData>({
    queryKey: ["summary"],
    queryFn: () => apiRequest("/api/summary"),
    initialData: { totalIncome: 0, totalExpenses: 0, totalTransfers: 0, netWorth: 0 },
  });

  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: () => apiRequest("/api/balance"),
  });

  const mutation = useMutation({
    mutationFn: (newTransaction: any) =>
      apiRequest("/api/transactions", {
        method: "POST",
        body: JSON.stringify(newTransaction),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      setIsFormOpen(false);
    },
  });

  const openForm = (type: TransactionType) => {
    setFormType(type);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    const transactionData: any = { ...data, type: formType };
    if (formType !== "transfer") {
      delete transactionData.recipientUserId;
    }
    mutation.mutate(transactionData);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <BalanceCard balance={balanceData?.balance ?? 0} previousBalance={0} />
          <SummaryCards data={summaryData} />
        </div>
        
        <div className="space-y-6">
          <QuickActions
            onAddIncome={() => openForm("income")}
            onAddExpense={() => openForm("expense")}
            onTransferMoney={() => openForm("transfer")}
          />
        </div>
      </div>

      <TransactionHistory transactions={sortedTransactions} />

      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        type={formType}
        onSubmit={handleFormSubmit}
        currentUserId={user.id}
      />
    </div>
  );
}