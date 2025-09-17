import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "../lib/queryClient";
import type { User } from "@shared/schema";

export type TransactionType = "income" | "expense" | "transfer";

interface TransactionFormData {
  amount: number;
  description: string;
  category?: string;
  recipientUserId?: string;
}

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
  onSubmit: (data: TransactionFormData) => void;
  currentUserId?: string;
}

export default function TransactionForm({ isOpen, onClose, type, onSubmit, currentUserId }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: 0,
    description: "",
    category: "",
    recipientUserId: ""
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => apiRequest("/api/users"),
    enabled: isOpen && type === "transfer",
  });

  const expenseCategories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other"
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other"
  ];

  const categories = type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      amount: 0,
      description: "",
      category: "",
      recipientUserId: ""
    });
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case "income": return "Add Income";
      case "expense": return "Add Expense";
      case "transfer": return "Transfer Money";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "income": return "Record money you've received";
      case "expense": return "Track money you've spent";
      case "transfer": return "Send money to another user";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-8 font-mono"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                data-testid="input-amount"
                required
              />
            </div>
          </div>

          {type === "transfer" && (
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, recipientUserId: value })}>
                <SelectTrigger data-testid="select-recipient">
                  <SelectValue placeholder="Select a recipient" />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(user => user.id !== currentUserId).map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {type !== "transfer" && (
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder={type === "transfer" ? "Optional message for recipient" : "What was this for?"}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              data-testid="input-description"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" data-testid="button-submit">
              {type === "transfer" ? "Send Money" : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}