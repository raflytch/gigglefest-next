"use client";

import { LoginBanner } from "@/components/LoginBanner";
import { LoginForm } from "@/components/LoginForm";
import { GlobalAlert } from "@/components/GlobalAlert";

export default function LoginPage() {
  return (
    <>
      <GlobalAlert />
      <div className="flex h-screen w-full">
        <div className="hidden lg:block lg:w-1/2">
          <LoginBanner />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
