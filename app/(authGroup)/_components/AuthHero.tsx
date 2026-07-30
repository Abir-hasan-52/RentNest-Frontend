import { CheckCircle2, House, ShieldCheck } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="hidden flex-col justify-center lg:flex">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl">
        <House size={40} />
      </div>

      <h1 className="text-5xl font-bold tracking-tight">
        Welcome to <span className="text-primary">RentNest</span>
      </h1>

      <p className="mt-6 max-w-lg text-lg text-muted-foreground">
        Find verified rental properties, connect with trusted landlords, and
        manage everything in one secure platform.
      </p>

      <div className="mt-10 space-y-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-primary" />
          <span>Verified Properties</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary" />
          <span>Secure Payments</span>
        </div>

        <div className="flex items-center gap-3">
          <House className="text-primary" />
          <span>Trusted Landlords</span>
        </div>
      </div>
    </div>
  );
}