"use client";

import Header from "@/components/Header/Header";
import useAuthStore from "@/context/AuthStore";
import ProfileForm from "@/components/Forms/ProfileForm";

const tiles = ["Profile", "Create", "Releases"];

function Overview() {
  const { userData } = useAuthStore((state) => state);

  console.log("userData", userData);

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Dashboard" />
      <div className="flex flex-row gap-4  p-5">
        {tiles.map((tile) => (
          <div key={tile}>{tile}</div>
        ))}
      </div>

      <ProfileForm />
    </div>
  );
}

export default Overview;
