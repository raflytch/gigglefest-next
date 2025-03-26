"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { AuthHero } from "@/components/auth/AuthHero";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OTPVerificationPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);

  useEffect(() => {
    if (!email) {
      router.push("/reset-password");
    }

    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [email, resendCooldown, router]);

  const handleResendCode = () => {
    if (resendCooldown === 0) {
      setResendCooldown(30);
      // Simulate resending code
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length === 6) {
      setIsLoading(true);

      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        router.push("/new-password");
      }, 1500);
    }
  };

  const isOtpComplete = otp.length === 6;
  const maskedEmail = email ? email.replace(/(.{3})(.*)(@.*)/, "$1***$3") : "";

  return (
    <div className="flex h-screen w-full">
      <AuthHero />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="flex justify-center items-center h-full w-full max-w-md">
          <Card className="w-full shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-4 pb-8">
                <CardTitle className="text-3xl font-bold text-center">
                  Verification Code
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Enter the 6-digit code sent to {maskedEmail}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8">
                <div className="grid gap-8">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    containerClassName="justify-center gap-3"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="h-14 w-14 text-2xl font-bold"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-14 w-14 text-2xl font-bold"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-14 w-14 text-2xl font-bold"
                      />
                      <InputOTPSeparator />
                      <InputOTPSlot
                        index={3}
                        className="h-14 w-14 text-2xl font-bold"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-14 w-14 text-2xl font-bold"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-14 w-14 text-2xl font-bold"
                      />
                    </InputOTPGroup>
                  </InputOTP>

                  <div className="text-center text-base text-muted-foreground">
                    Didn't receive a code?{" "}
                    <button
                      type="button"
                      className={`text-primary font-medium hover:underline ${
                        resendCooldown > 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handleResendCode}
                      disabled={resendCooldown > 0}
                    >
                      {resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : "Resend code"}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-6 pt-6 pb-8 px-8">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={!isOtpComplete || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                <div className="text-center text-sm mt-2">
                  <Link
                    href="/reset-password"
                    className="text-primary hover:underline font-medium"
                  >
                    Use a different email
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
