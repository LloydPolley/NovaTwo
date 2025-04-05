"use client";

import Header from "@/components/Header/Header";
import useAuthStore from "@/context/AuthStore";
import ProfileForm from "@/components/Forms/ProfileForm";

const tiles = ["Profile", "Create", "Releases"];

function Overview() {
  const { userData } = useAuthStore((state) => state);

  return (
    <div className="flex flex-grow flex-col">
      {userData && <ProfileForm userData={userData} />}
    </div>
  );
}

export default Overview;
