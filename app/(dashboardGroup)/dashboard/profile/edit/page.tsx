import EditProfileForm from "@/app/(dashboardGroup)/_components/EditProfileForm";
import { getMe } from "@/services/getMe";
import { redirect } from "next/navigation";
// import EditProfileForm from "../../_components/EditProfileForm";

export default async function EditProfilePage() {
  const res = await getMe();

  if (!res?.success || !res.data) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <EditProfileForm user={res.data} />
    </div>
  );
}