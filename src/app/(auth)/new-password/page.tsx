"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthHero } from "@/components/auth/AuthHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { useAppSelector } from "@/features/hooks";
import { parseCookies } from "nookies";

export default function NewPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { resetPassword } = usePasswordReset();
  const { loading: isLoading, error } = useAppSelector(
    (state) => state.passwordReset
  );

  useEffect(() => {
    const cookies = parseCookies();
    const resetToken = cookies.reset_token;
    const resetOtp = cookies.reset_otp;

    if (!resetToken || !resetOtp) {
      router.push("/reset-password");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    resetPassword({
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const isPasswordValid = formData.password.length >= 8;

  return (
    <>
      <div className="flex h-screen w-full">
        <AuthHero />
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="flex justify-center items-center h-full w-full max-w-md">
            <Card className="w-full shadow-lg">
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-4 pb-8">
                  <CardTitle className="text-3xl font-bold text-center">
                    Set New Password
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Create a new password for your account
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-8">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label
                        htmlFor="password"
                        className="text-base font-medium"
                      >
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="h-12 text-base px-4 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {formData.password && !isPasswordValid && (
                        <p className="text-sm text-destructive mt-1">
                          Password must be at least 8 characters
                        </p>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-base font-medium"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="h-12 text-base px-4"
                        required
                      />
                      {formData.confirmPassword && !passwordsMatch && (
                        <p className="text-sm text-destructive mt-1">
                          Passwords don't match
                        </p>
                      )}
                    </div>

                    {error && (
                      <p className="text-sm text-destructive mt-1">{error}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 pt-6 pb-8 px-8">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={!passwordsMatch || !isPasswordValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Updating password...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
