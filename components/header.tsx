"use client";

import Image from "next/image";
import { useContext, useDeferredValue } from "react";
import { UserContext } from "./sections/user";

const Keys = ["followers", "following", "location"] as const;

export function Header() {
  const { user } = useContext(UserContext);
  const currentUser = useDeferredValue(user);

  return (
    <header className="mt-3 flex gap-5 mx-auto w-full mb-5">
      <div className="border-8 bg-ebony-clay border-ebony-clay rounded-xl -mt-[54px] flex-shrink-0">
        <Image
          className="rounded-xl"
          width={104}
          height={104}
          src={currentUser.avatar_url}
          alt=""
        />
      </div><div className="flex gap-5 flex-wrap">
      {Keys.map((key) =>
        currentUser[key] !== null ? (
          <div
            key={key}
            className="h-[52px] bg-ebony py-2 px-5 flex items-center justify-center rounded-xl"
          >
            <span className="pr-5 py-2 mr-[18px] border-r border-r-gull-gray">
              {key[0].toUpperCase() + key.slice(1)}
            </span>
            <strong>{currentUser[key]}</strong>
          </div>
        ) : null
      )}</div>
    </header>
  );
}
