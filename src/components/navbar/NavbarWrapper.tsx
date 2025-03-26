"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hiddenNavbarPaths = [
    "/login",
    "/register",
    "/404",
    "/reset-password",
    "/otp-verification",
    "/new-password",
  ];

  const shouldHideNavbar =
    hiddenNavbarPaths.includes(pathname) || pathname.startsWith("/(auth)");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main className={!shouldHideNavbar ? "pt-24" : ""}>{children}</main>
    </>
  );
}
