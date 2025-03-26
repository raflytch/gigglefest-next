"use client";

import { LoginForm } from "@/components/LoginForm";
import { GlobalAlert } from "@/components/GlobalAlert";
import { AuthHero } from "@/components/auth/AuthHero";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset");

  useEffect(() => {
    if (resetSuccess === "success") {
      toast.success("Password Reset Successful", {
        description:
          "Your password has been updated successfully. Please log in with your new password.",
      });
    }
  }, [resetSuccess]);
  return (
    <>
      <GlobalAlert />
      <div className="flex h-screen w-full">
        <AuthHero />
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
