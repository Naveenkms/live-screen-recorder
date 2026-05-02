"use client";

import { buttonVariants } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <a href="/auth/logout" className={buttonVariants({ variant: "outline", size: "lg" })}>
      Sign out
    </a>
  );
}
