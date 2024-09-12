"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "./Form/Form";
import { redirect, RedirectType } from "next/navigation";
import useAuthStore from "../../context/AuthStore";

const defaultValues = {
  releaseId: "",
};

function ReleaseType() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { userData } = useAuthStore((state) => state);
  const [url, setUrl] = useState(null);

  const onSubmit = async (data) => {
    const { artworkFileLocation, releaseId, name } =
      userData.releases[data.releaseId];
    console.log("data", data);
    localStorage.setItem(
      "release",
      JSON.stringify({ name, releaseId, artworkFileLocation })
    );
    setUrl("compl");
  };

  useEffect(() => {
    if (url) {
      redirect("/release/upload", RedirectType.push);
    }
  }, [url]);

  if (userData === null) {
    return null;
  }

  return (
    <Form title={"Select Release"}>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <ul className="max-h-[60vh] lg:max-h-[1000px] overflow-scroll">
          {userData?.releases?.map((release, index) => {
            const { name } = release;
            return (
              <li
                key={name}
                className="w-full h-auto flex flex-row items-start gap-2 bg-stone-800 rounded-lg p-4 text-left mb-4"
              >
                <input
                  className="my-auto"
                  type="radio"
                  id={name}
                  name="fav_language"
                  value={index}
                  {...register("releaseId")}
                />
                <label htmlFor={name} className="text-2xl font-semibold w-full">
                  {name}
                </label>
              </li>
            );
          })}
        </ul>

        <input
          type="submit"
          value="Next"
          className="w-full bg-blue-500 text-white rounded py-2 cursor-pointer disabled:bg-blue-300"
        />
      </form>
    </Form>
  );
}

export default ReleaseType;
