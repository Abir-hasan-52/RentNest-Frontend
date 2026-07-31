"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IUser } from "@/types/user.type";
import { ImageIcon, Loader2, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  updateProfileAction,
  ActionState,
} from "../_actions/updateProfile.action";

const initialState: ActionState = { success: false, message: "" };

type EditProfileFormProps = {
  user: IUser["data"];
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [state, action, pending] = useActionState(
    updateProfileAction,
    initialState,
  );
  const [preview, setPreview] = useState(user.profileImage ?? "");
  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/profile");
    } else if (!state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Card className="rounded-3xl border border-border/60 bg-card/90 p-5 shadow-2xl sm:p-8">
      <div className="mb-8 space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit profile
        </h2>

        <p className="text-muted-foreground">
          Update your personal information
        </p>
      </div>

      <form action={action} className="space-y-5" noValidate>
        {/* Avatar preview */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-primary/10">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Profile picture preview"
                className="h-full w-full object-cover"
                onError={() => setPreview("")}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            )}
          </div>
        </div>

        {/* Profile image URL */}
        <div>
          <div className="relative">
            <ImageIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="profileImage"
              type="url"
              placeholder="Paste image URL (e.g. https://...)"
              defaultValue={user.profileImage ?? ""}
              onChange={(e) => setPreview(e.target.value)}
              className="h-12 rounded-xl pl-12"
              aria-invalid={!!state.errors?.profileImage}
            />
          </div>
          {state.errors?.profileImage && (
            <p className="mt-1.5 pl-1 text-sm text-destructive">
              {state.errors.profileImage[0]}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <div className="relative">
            <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="name"
              type="text"
              placeholder="Enter your full name"
              defaultValue={user.name ?? ""}
              className="h-12 rounded-xl pl-12"
              aria-invalid={!!state.errors?.name}
            />
          </div>
          {state.errors?.name && (
            <p className="mt-1.5 pl-1 text-sm text-destructive">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <div className="relative">
            <Phone className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              defaultValue={user.phone ?? ""}
              className="h-12 rounded-xl pl-12"
              aria-invalid={!!state.errors?.phone}
            />
          </div>
          {state.errors?.phone && (
            <p className="mt-1.5 pl-1 text-sm text-destructive">
              {state.errors.phone[0]}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <div className="relative">
            <MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="address"
              type="text"
              placeholder="Enter your address"
              defaultValue={user.address ?? ""}
              className="h-12 rounded-xl pl-12"
              aria-invalid={!!state.errors?.address}
            />
          </div>
          {state.errors?.address && (
            <p className="mt-1.5 pl-1 text-sm text-destructive">
              {state.errors.address[0]}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            type="submit"
            disabled={pending}
            className="h-12 flex-1 rounded-xl text-base font-semibold"
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? "Saving..." : "Save changes"}
          </Button>

          <Button
            asChild
            type="button"
            variant="outline"
            className="h-12 flex-1 rounded-xl text-base font-semibold"
          >
            <Link href="/profile">Cancel</Link>
          </Button>
        </div>
      </form>
    </Card>
  );
}
