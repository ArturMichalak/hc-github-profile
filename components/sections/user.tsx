"use client";

import { GithubProfile, GithubRepository } from "@/app/[[...username]]/page";
import { Header } from "../header";
import { Main } from "../main";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import Hero from "../hero";

interface UserProps {
  user: GithubProfile;
  repos: GithubRepository[];
}

export const UserContext = createContext(
  null as unknown as UserProps & {
    setUser: Dispatch<SetStateAction<GithubProfile>>;
    setRepos: Dispatch<SetStateAction<GithubRepository[]>>;
  }
);

export default function User(props: UserProps) {
  const [user, setUser] = useState(props.user);
  const [repos, setRepos] = useState(props.repos);

  return (
    <UserContext.Provider value={{ user, setUser, repos, setRepos }}>
      <Hero />
      <div className="max-w-[1125px] mx-auto px-[74px]">
        <Header />
        <Main />
      </div>
    </UserContext.Provider>
  );
}
