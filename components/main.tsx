"use client";

import { RepositoryPreview } from "./repository-preview";
import { useContext, useDeferredValue, useEffect, useState } from "react";
import { UserContext } from "./sections/user";

export function Main() {
  const { user, repos } = useContext(UserContext);
  const currentUser = useDeferredValue(user);
  const currentRepos = useDeferredValue(repos);

  const [shown, setShown] = useState(currentRepos.slice(0, 4));

  useEffect(() => {
    setShown(currentRepos.slice(0, 4));
  }, [currentRepos]);
  const onLoadMore = () => {
    setShown(currentRepos);
  };
  return (
    <main>
      <section>
        <header>
          <h1 className="mb-3">{currentUser.name || currentUser.login}</h1>
          <p>{currentUser.bio}</p>
        </header>
        <ul className="mt-8 grid lg:grid-cols-2 gap-8 flex-wrap">
          {shown.map((repo) => (
            <RepositoryPreview key={repo.id} {...{ repo }} />
          ))}
        </ul>
        <button className="mt-12 mx-auto block mb-[90px]" onClick={onLoadMore}>
          View all repositories
        </button>
      </section>
    </main>
  );
}
