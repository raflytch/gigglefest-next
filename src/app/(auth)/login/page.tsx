"use client";

import { LoginForm } from "@/components/LoginForm";
import { GlobalAlert } from "@/components/GlobalAlert";
import { AuthHero } from "@/components/auth/AuthHero";

export default function LoginPage() {
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
