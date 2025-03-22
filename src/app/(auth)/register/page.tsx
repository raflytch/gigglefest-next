"use client";

import { RegisterPageContent } from "@/components/auth/RegisterPageContent";
import { AuthHero } from "@/components/auth/AuthHero";

export default function RegisterPage() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col md:flex-row">
        <AuthHero />
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-background min-h-screen">
          <RegisterPageContent />
        </div>
      </div>
    </>
  );
}
