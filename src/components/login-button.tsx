import { buttonVariants } from "./ui/button";

export default function LoginButton() {
  return (
    <a
      href="/auth/login"
      className={buttonVariants({ variant: "secondary", size: "lg" })}
    >
      Sign in to start recording
    </a>
  );
}
