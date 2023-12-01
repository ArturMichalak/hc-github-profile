import { request } from "@octokit/request";

import User from "@/components/sections/user";

export interface GithubProfile {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
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

export default async function Home({
  params: { username = "github" },
}: {
  params: { username: string | string[] };
}) {
  const getGithubProfile = async (
    username: string,
    abortController?: AbortController
  ) => {
    const rawUser = await request(`GET /users/${username}`, {
      request: { signal: abortController?.signal },
    });
    const user: GithubProfile = await rawUser.data;
    return user;
  };

  const getGithubRepositories = async (
    username: string,
    abortController?: AbortController
  ) => {
    const rawRepos = await request(`GET /users/${username}/repos`, {
      request: { signal: abortController?.signal },
    });
    const repos: GithubRepository[] = await rawRepos.data;
    return repos;
  };

  const un =
    Array.isArray(username) && username.length
      ? username[0]
      : (username as string);
  const userRaw = getGithubProfile(un);
  const reposRaw = getGithubRepositories(un);
  const [user, repos] = await Promise.all([userRaw, reposRaw]);

  return <User user={user} repos={repos} />;
}
