import { Logo } from "@/components/shared/Logo";
import { CheckCircle2, House, ShieldCheck } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="hidden flex-col justify-center lg:flex">
      <Logo showText={false} className="mb-8" iconClassName="h-16 w-16 lg:h-20 lg:w-20" />

      <h1 className="text-5xl font-bold tracking-tight text-balance">
        Welcome to <span className="text-primary">RentNest</span>
      </h1>

      <p className="mt-6 max-w-lg text-lg text-muted-foreground text-pretty">
        Find verified rental properties, connect with trusted landlords, and
        manage everything in one secure platform.
      </p>

      <div className="mt-10 space-y-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="shrink-0 text-primary" />
          <span>Verified Properties</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="shrink-0 text-primary" />
          <span>Secure Payments</span>
        </div>

        <div className="flex items-center gap-3">
          <House className="shrink-0 text-primary" />
          <span>Trusted Landlords</span>
        </div>
      </div>
    </div>
  );
}