export function LogoIcon() {
  return (
    <div className="relative size-8">
      <div className="border-brand-accent absolute inset-0 rounded-full border-2" />
      <div className="bg-brand absolute animate-pulse left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full" />
    </div>
  );
}

export function LogoText() {
  return (
    <span className="text-2xl font-semibold text-brand">
      Record<span className="text-brand-accent">It</span>
    </span>
  );
}

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <LogoText />
    </div>
  );
}
