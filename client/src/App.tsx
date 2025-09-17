import { useToast } from "@/hooks/use-toast";
import MoneyLoader from "@/components/MoneyLoader";
import { useState,useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, apiRequest, setCurrentUserId } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import AuthCard from "@/components/AuthCard";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setCurrentUserId(userData.id);
        try {
          const response = await apiRequest("/api/auth/me");
          if (response.user) {
            setUser(response.user);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      if (response.user) {
        setUser(response.user);
        setCurrentUserId(response.user.id);
        localStorage.setItem("user", JSON.stringify(response.user));
        queryClient.setQueryData(["currentUser"], response.user);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed", 
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      
      if (response.user) {
        setUser(response.user);
        setCurrentUserId(response.user.id);
        localStorage.setItem("user", JSON.stringify(response.user));
        queryClient.setQueryData(["currentUser"], response.user);
        toast({
          title: "Success",
          description: "Account created successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentUserId(null);
    localStorage.removeItem("user");
    queryClient.clear();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (loading) {
    return <MoneyLoader />;
  }

  if (!user) {
    return (
      <AuthCard onLogin={handleLogin} onRegister={handleRegister} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        user={user}
        onLogout={handleLogout}
        isDark={theme === "dark"}
        onToggleTheme={toggleTheme}
      />
      <Dashboard user={user} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="purseflow-theme">
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
