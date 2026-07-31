"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/themeBtn";
// import { ModeToggle } from "./themeBtn";
// import { UserDropdown } from "./UserDropdown";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-4">
        {/* for mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent/10 md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="text-left text-xl font-bold">
                My App
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="rounded-md bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Profile
              </Link>
              <Link
                href="/"
                className="mt-4 rounded-md border px-3 py-2.5 text-center text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Back to Home
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/*  Page Title (Only show on desktop) */}
        <h1 className="hidden text-lg font-semibold md:block">
          Dashboard Overview
        </h1>
      </div>

      <div className="flex items-center gap-5 md:gap-6 md:mr-6">
        <ModeToggle />
      </div>
    </header>
  );
}
