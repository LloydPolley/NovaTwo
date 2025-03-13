"use client";

import { UserPlus } from "lucide-react";
import useAuthStore from "../../context/AuthStore";
import useFollowerStore from "@/context/FollowerStore";

const Header = ({ title }) => {
  return (
    <div className="px-5 pt-5 lg:pt-10">
      <h1 className="text-6xl font-black">{title}</h1>
    </div>
  );
};

export default Header;
