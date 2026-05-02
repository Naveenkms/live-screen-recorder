import { buttonVariants } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <a href="/auth/login" className={buttonVariants({ size: "lg" })}>
      Sign in to start recording
    </a>
  );
}
