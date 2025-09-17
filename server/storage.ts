import { db } from "./db";
import { users, transactions, insertUserSchema, insertTransactionSchema } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { User, InsertUser, Transaction, InsertTransaction } from "@shared/schema";

export class DrizzleStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(insertUser.password, saltRounds);

    const result = await db.insert(users).values({ ...insertUser, passwordHash }).returning();
    return result[0];
  }

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  async createTransaction(transactionData: InsertTransaction & { userId: string }): Promise<Transaction> {
    const result = await db.insert(transactions).values({ ...transactionData }).returning();
    return result[0];
  }

  async getTransactionById(id: string): Promise<Transaction | undefined> {
    const result = await db.select().from(transactions).where(eq(transactions.id, id));
    return result[0];
  }

  async getUserBalance(userId: string): Promise<number> {
    const userTransactions = await this.getTransactionsByUserId(userId);
    return userTransactions.reduce((balance, transaction) => {
      const amount = parseFloat(transaction.amount || '0');
      if (isNaN(amount)) return balance; // Skip if amount is not a valid number

      if (transaction.type === "income") {
        return balance + amount;
      }
      return balance - amount;
    }, 0);
  }

  async getUserSummary(userId: string): Promise<{
    totalIncome: number;
    totalExpenses: number;
    totalTransfers: number;
    balance: number;
  }> {
    const userTransactions = await this.getTransactionsByUserId(userId);
    const summary = userTransactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount || '0');
      if (isNaN(amount)) return acc; // Skip if amount is not a valid number

      if (transaction.type === "income") {
        acc.totalIncome += amount;
      } else if (transaction.type === "expense") {
        acc.totalExpenses += amount;
      } else if (transaction.type === "transfer") {
        acc.totalTransfers += amount;
      }
      return acc;
    }, { totalIncome: 0, totalExpenses: 0, totalTransfers: 0 });

    const balance = summary.totalIncome - summary.totalExpenses - summary.totalTransfers;

    return { ...summary, balance };
  }
}

export const storage = new DrizzleStorage();
