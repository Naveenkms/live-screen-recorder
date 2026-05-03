"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./button";

export function NavButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const active = usePathname().startsWith(href);
  return (
    <Button asChild variant={active ? "secondary" : "ghost"}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
