"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthHero } from "@/components/auth/AuthHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { useAppSelector } from "@/features/hooks";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { forgotPassword } = usePasswordReset();
  const { loading: isLoading, error } = useAppSelector(
    (state) => state.passwordReset
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  const handleToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/login");
  };

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
                    Reset Password
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Enter your email to receive a verification code
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-8">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="giggleftest@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 text-base px-4"
                      />
                      {error && (
                        <p className="text-sm text-destructive mt-1">{error}</p>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 pt-6 pb-8 px-8">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending code...
                      </>
                    ) : (
                      "Send Reset Code"
                    )}
                  </Button>

                  <Button
                    className="w-full h-12 text-base font-medium bg-transparent border border-primary text-primary hover:bg-gray-200"
                    onClick={handleToLogin}
                  >
                    <Link
                      href="/login"
                      className="text-primary hover:underline text-center"
                    >
                      Back to login
                    </Link>
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
