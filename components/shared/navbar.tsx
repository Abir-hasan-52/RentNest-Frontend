"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/services/logout";
import { IUser } from "@/types/user.type";
import { LayoutDashboard, LogOut, Menu,   User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "../shared/Logo";
import { Button } from "../ui/button";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

const userMenuItems = [
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
];

type NavbarProps = {
    user?: IUser
}

export function Navbar({ user }: NavbarProps) {
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)

    const isLoggedIn = !!user?.success

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
            router.refresh();
        } catch {
            toast.error("Failed to log out. Please try again.");
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    {/* Desktop nav links */}
                    <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* User / auth area — desktop */}
                        <div className="hidden md:block">
                            {isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 outline-none ring-ring transition-colors hover:bg-primary/15 focus-visible:ring-2"
                                            aria-label="Open user menu"
                                        >
                                            <User className="h-4 w-4 text-primary" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-medium">{user?.data?.name}</p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user?.data?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <DropdownMenuItem key={item.href} asChild>
                                                    <Link href={item.href}>
                                                        <Icon className="mr-2 h-4 w-4" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login">
                                    <Button>Login</Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <button
                                    className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent/10 md:hidden"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Logo />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="mt-6 flex flex-col gap-1 px-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/10"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-4 border-t border-border px-4 pt-4">
                                    {isLoggedIn ? (
                                        <div className="flex flex-col gap-1">
                                            <div className="mb-2 px-3">
                                                <p className="text-sm font-medium">{user?.data?.name}</p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user?.data?.email}
                                                </p>
                                            </div>
                                            {userMenuItems.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/10"
                                                    >
                                                        <Icon className="mr-2 h-4 w-4" />
                                                        {item.label}
                                                    </Link>
                                                );
                                            })}
                                            <button
                                                onClick={() => {
                                                    setMobileOpen(false);
                                                    handleLogout();
                                                }}
                                                className="flex items-center rounded-md px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Log out
                                            </button>
                                        </div>
                                    ) : (
                                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                                            <Button className="w-full">Login</Button>
                                        </Link>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}