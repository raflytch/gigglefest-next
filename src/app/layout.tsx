import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { NavbarWrapper } from "@/components/navbar/NavbarWrapper";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "GiggleFest",
  description: "Entertainment Platform",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased font-poppins`}
      >
        <Providers>
          <NavbarWrapper>{children}</NavbarWrapper>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
