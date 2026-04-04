import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth";
import { redirect } from "next/navigation";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Live Screen Recorder",
  description: "Record your screen live",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Auth0Provider>{children}</Auth0Provider>
        <Toaster />
      </body>
    </html>
  );
}
