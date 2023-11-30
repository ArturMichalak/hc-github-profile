"use client";

import Image from "next/image";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

import {
  getGithubProfile,
  getGithubRepositories,
  GithubProfile,
} from "@/app/[[...username]]/page";
import seachIcon from "@/public/search.svg";

import { UserContext } from "./sections/user";

export default function SearchBar() {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState<GithubProfile>();

  let { setUser, setRepos } = useContext(UserContext);

  useEffect(() => {
    const abortController = new AbortController();
    if (userName)
      getGithubProfile(userName, abortController).then((res) =>
        setProfile(res)
      );
    return () => abortController.abort();
  }, [userName]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUserName(e.target.value);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (profile) {
      getGithubRepositories(userName).then((res) => {
        setRepos(res);
        setUser(profile);
        setUserName("");
        setProfile(undefined);
      });
    }
  };

  const onEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && profile) {
      getGithubRepositories(userName).then((res) => {
        setRepos(res);
        setUser(profile);
        setUserName("");
        setProfile(undefined);
      });
    }
  };

  return (
    <>
      <form className="h-14 max-w-[484px] w-full bg-ebony-clay mx-auto rounded-xl px-4 flex focus-within:shadow-[inset_0_0_0_2px_#3762E4] relative">
        <button className="h-full" disabled>
          <Image src={seachIcon} className="w-6" alt="find user" />
        </button>
        <input
          autoFocus
          type="search"
          value={userName}
          onChange={onChange}
          onKeyDown={onEnterKeyDown}
          placeholder="username"
          className="text-gull-gray w-full outline-none bg-transparent pl-3"
        />
        {profile && (
          <button
            onClick={onClick}
            className="absolute w-full top-full mt-2 flex items-center gap-2 left-0 p-2 bg-ebony rounded-xl"
          >
            <Image
              className="rounded-xl"
              width={72}
              height={72}
              src={profile.avatar_url}
              alt=""
            />
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-base">{profile.name || profile.login}</h2>
              <small>{profile.bio}</small>
            </div>
          </button>
        )}
      </form>
    </>
  );
}
