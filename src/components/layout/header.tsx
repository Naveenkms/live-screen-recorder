import Link from "next/link";

import Logo from "../ui/logo";
import LoginButton from "@/features/auth/components/login-button";
import LogoutButton from "@/features/auth/components/logout-button";
import { auth0 } from "@/lib/auth";
import { NavButton } from "../ui/nav-button";

export async function Header() {
  const session = await auth0.getSession();

  return (
    <header className="sticky top-0 z-60 flex h-16 items-center justify-between rounded-full border-b px-10">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Logo />
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <NavButton href="/">Home</NavButton>{" "}
            </li>
            <li>
              <NavButton href="/recordings">Recordings</NavButton>{" "}
            </li>
          </ul>
        </nav>
      </div>
      {session ? <LogoutButton /> : <LoginButton />}
    </header>
  );
}
