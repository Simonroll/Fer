"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [errorAuth, setErrorAuth] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setErrorAuth("");
    const newErrors: { email?: string; password?: string } = {};

    // Validate Email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate Password
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);

    const { error } = await signIn({ email, password });
    
    setIsSubmitting(false);

    if (error) {
      setErrorAuth(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed px-4 relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 border-[#d4af37] border-2 shadow-2xl rounded-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form data-testid="login-form" onSubmit={handleSubmit} noValidate className="space-y-4">
            {errorAuth && (
              <div data-testid="error-auth" className="p-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">
                {errorAuth}
              </div>
            )}
            {success && (
              <div data-testid="form-success" className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="email"
                data-testid="login-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
              />
              {errors.email && (
                <p data-testid="error-email" className="text-sm text-red-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                data-testid="login-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
              />
              {errors.password && (
                <p data-testid="error-password" className="text-sm text-red-500 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <Button type="submit" data-testid="login-submit" className="w-full bg-[#2a2622] text-[#d4af37] font-bold uppercase tracking-widest border border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2622] transition-colors duration-500 rounded-none shadow-md">
              Authenticate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
