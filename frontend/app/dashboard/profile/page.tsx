"use client";

import { ProfileDetailForm } from "@/app/dashboard/profile/components/ProfileDetailForm";
import { ProfileCredentialsForm } from "@/app/dashboard/profile/components/ProfileCredentailsForm";
import { useUserProfile } from "@/lib/hooks/user.queries";

export default function ProfilePage() {
  const { data: user } = useUserProfile();

  return (
    <div className="w-3/4 p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <ProfileDetailForm user={user} />
      <ProfileCredentialsForm user={user} />
    </div>
  );
}
