import { StaticImport } from "next/dist/shared/lib/get-img-props";

import User from "@/components/sections/user";

export interface GithubProfile {
  login: string;
  name: string;
  id: number;
  avatar_url: string | StaticImport;
  followers: number;
  following: number;
  bio: string;
  type: string;
  company: string | null;
  location: string;
  repos_url: string;
}

export interface GithubRepository {
  id: number;
  name: string;
  description: string | null;
  license: { spdx_id: string } | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string; // ISO string
}

export async function getGithubProfile(
  username: string,
  abortController?: AbortController
) {
  const rawUser = await fetch(`https://api.github.com/users/${username}`, {
    signal: abortController?.signal,
  });
  const user: GithubProfile = await rawUser.json();
  return user;
}

export async function getGithubRepositories(
  username: string,
  abortController?: AbortController
) {
  const rawRepos = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      signal: abortController?.signal,
    }
  );
  const repos: GithubRepository[] = await rawRepos.json();
  return repos;
}

export default async function Page({
  params: { username = "github" },
}: {
  params: { username: string };
}) {
  const userRaw = getGithubProfile(username);
  const reposRaw = getGithubRepositories(username);
  const [user, repos] = await Promise.all([userRaw, reposRaw]);

  return <User user={user} repos={repos} />;
}
