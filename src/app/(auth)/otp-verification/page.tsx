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
import { AuthHero } from "@/components/auth/AuthHero";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { parseCookies, destroyCookie } from "nookies";
import { setEmail, resetState } from "@/features/auth/passwordResetSlice";

export default function OTPVerificationPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(30);

  const { verifyOtp, resendOtp } = usePasswordReset();
  const {
    loading: isLoading,
    error,
    email,
  } = useAppSelector((state) => state.passwordReset);

  useEffect(() => {
    if (emailParam) {
      dispatch(setEmail(emailParam));
    }

    const cookies = parseCookies();
    const resetToken = cookies.reset_token;

    if (!resetToken) {
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
  }, [emailParam, resendCooldown, router, dispatch]);

  const handleResendCode = () => {
    if (resendCooldown === 0) {
      resendOtp();
      setResendCooldown(30);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length === 6) {
      verifyOtp({ otp });
    }
  };

  const handleUseDifferentEmail = () => {
    destroyCookie(null, "reset_token", { path: "/" });
    destroyCookie(null, "reset_otp", { path: "/" });
    dispatch(resetState());
    router.push("/reset-password");
  };

  const isOtpComplete = otp.length === 6;
  const maskedEmail = email ? email.replace(/(.{3})(.*)(@.*)/, "$1***$3") : "";

  return (
    <div className="flex h-screen w-full">
      <AuthHero />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
        <div className="flex justify-center items-center h-full w-full max-w-md">
          <Card className="w-full shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-4 pb-6 sm:pb-8">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
                  Verification Code
                </CardTitle>
                <CardDescription className="text-center text-sm sm:text-base">
                  Enter the 6-digit code sent to {maskedEmail}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 sm:px-8">
                <div className="grid gap-6 sm:gap-8">
                  <div className="w-full flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      containerClassName="justify-center gap-1 sm:gap-3"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="h-10 w-10 sm:h-14 sm:w-14 text-lg sm:text-2xl font-bold"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-10 w-10 sm:h-14 sm:w-14 text-lg sm:text-2xl font-bold"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-10 w-10 sm:h-14 sm:w-14 text-lg sm:text-2xl font-bold"
                        />
                        <InputOTPSeparator />
                        <InputOTPSlot
                          index={3}
                          className="h-10 w-10 sm:h-14 sm:w-14 text-lg sm:text-2xl font-bold"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-10 w-10 sm:h-14 sm:w-14 text-lg sm:text-2xl font-bold"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-10 w-10 sm:h-14 sm:w-14 text-lg sm:text-2xl font-bold"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {error && (
                    <p className="text-sm text-destructive text-center">
                      {error}
                    </p>
                  )}

                  <div className="text-center text-sm sm:text-base text-muted-foreground">
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

              <CardFooter className="flex flex-col gap-4 sm:gap-6 pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-8">
                <Button
                  type="submit"
                  className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                  disabled={!isOtpComplete || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 text-sm sm:text-base"
                  onClick={handleUseDifferentEmail}
                >
                  Use a different email
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
