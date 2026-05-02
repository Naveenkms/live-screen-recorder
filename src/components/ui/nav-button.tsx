"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export function NavButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const active = usePathname().startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: active ? "secondary" : "ghost" }),
      )}
    >
      {children}
    </Link>
  );
}
