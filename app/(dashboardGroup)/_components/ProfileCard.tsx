import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import Link from "next/link";
import { getMe } from "@/services/getMe";
 

export default async function ProfileCard() {
  const res = await getMe();

  if (!res?.success || !res.data) {
    return (
      <Card className="rounded-3xl border border-border/60 bg-card/90 p-8 text-center shadow-2xl">
        <p className="text-muted-foreground">Failed to load profile.</p>
      </Card>
    );
  }

  const user = res.data;

  const statusVariant =
    user.status ===  "ACTIVE"
      ? "default"
      : user.status === "BANNED"
        ? "destructive"
        : "secondary";

  return (
    <Card className="rounded-3xl border border-border/60 bg-card/90 p-5 shadow-2xl sm:p-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
            {user.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.profileImage}
                alt={user.name ?? "Profile picture"}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-9 w-9 text-primary" />
            )}
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold tracking-tight wrap-break-word sm:text-2xl">
              {user.name ?? "Unnamed user"}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge variant="outline">{user.role}</Badge>
              <Badge variant={statusVariant}>{user.status}</Badge>
            </div>
          </div>
        </div>

        <Button asChild variant="outline" className="w-full shrink-0 sm:w-auto">
          <Link href="/dashboard/profile/edit">
            <Pencil className="mr-2 h-4 w-4" />
            Edit profile
          </Link>
        </Button>
      </div>

      {/* Details */}
      <div className="mt-8 space-y-4 border-t border-border/60 pt-6">
        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            Email
          </div>
          <span className="font-medium break-all sm:ml-auto sm:text-right">
            {user.email}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            Phone
          </div>
          <span className="font-medium sm:ml-auto sm:text-right">
            {user.phone ?? "Not provided"}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            Address
          </div>
          <span className="font-medium wrap-break-word sm:ml-auto sm:max-w-[60%] sm:text-right">
            {user.address ?? "Not provided"}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            Joined
          </div>
          <span className="font-medium sm:ml-auto sm:text-right">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </Card>
  );
}