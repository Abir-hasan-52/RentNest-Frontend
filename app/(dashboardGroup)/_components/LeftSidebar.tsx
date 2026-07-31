import { Logo } from "@/components/shared/Logo";
import { getMe } from "@/services/getMe";
import { LayoutDashboard, User, Home, LucideIcon } from "lucide-react";
import Link from "next/link";

// 1. Link er jonno proper TypeScript type define korun
type SidebarLink = {
  title: string;
  href: string;
  icon: LucideIcon;
};

// 2. Function-e strict types add korun
const getSidebarLinks = (role: string | undefined): SidebarLink[] => {
  // Common links
  const commonLinks: SidebarLink[] = [
    { title: "Profile", href: "/dashboard/profile", icon: User },
  ];

  // Record er type strict kore din
  const roleBasedLinks: Record<string, SidebarLink[]> = {
    ADMIN: [
      { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
       {
        title: "Manage Users",
        href: "/dashboard/admin/users",
        icon: User,
       }
    ],
    LANDLORD: [
      { title: "My Dashboard", href: "/dashboard/landlord", icon: LayoutDashboard },
      ...commonLinks,
    ],
    TENANT: [
      { title: "My Dashboard", href: "/dashboard/tenant", icon: LayoutDashboard },
      ...commonLinks,
    ],
  };

  // Role jodi na thake ba onno kichu ashe, default vabe commonLinks return korbe
  return role ? roleBasedLinks[role] || commonLinks : commonLinks;
};

export async function LeftSidebar() {
  const user = await getMe();
  const role = user?.data?.role;

   
  const sidebarLinks = getSidebarLinks(role);

  return (
    <aside className="sticky top-0 z-40 hidden h-screen w-64 flex-col border-r bg-background md:flex">
      {/* logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>

      {/* links */}
      <nav className="flex-1 space-y-2 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}  
              href={link.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              <Icon className="h-4 w-4" />
              {link.title}
            </Link>
          );
        })}

        {/* back to home */}
        <div className="my-4 border-t border-border"></div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </nav>
    </aside>
  );
}