import { GithubRepository } from "@/app/[[...username]]/page";
import licenseIcon from "@/public/chield-alt.svg";
import branchIcon from "@/public/nesting.svg";
import starIcon from "@/public/star.svg";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  repo: GithubRepository;
}

const getDate = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = +now - +date;

  const years = Math.floor(diff / 31536000000);
  const months = Math.floor(diff / 2592000000);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);

  return (
    "updated " +
    (years
      ? years + (years > 1 ? " years" : " year")
      : months
      ? months + (months > 1 ? " months" : " month")
      : days
      ? days + (days > 1 ? " days" : " day")
      : hours + (hours > 1 ? " hours" : " hour")) +
    " ago"
  );
};

export function RepositoryPreview({ repo }: HeaderProps) {
  return (
    <li>
      <Link href={repo.html_url}>
      <article className="py-6 px-5 rounded-xl bg-ebony bg-gradient-to-r from-ebony to-port-gore">
        <h2 className="mb-4">{repo.name}</h2>
        <p>{repo.description}</p>
        <ul className="flex gap-3 mt-5">
          {repo.license !== null && (
            <li className="flex items-center gap-1">
              <Image src={licenseIcon} alt="" />
              {repo.license?.spdx_id}
            </li>
          )}
          <li className="flex items-center gap-1">
            <Image src={branchIcon} alt="" />
            {repo.forks_count}
          </li>
          <li className="flex items-center gap-1">
            <Image src={starIcon} alt="" />
            {repo.stargazers_count}
          </li>
          <li className="flex items-center">
            <small>{getDate(repo.updated_at)}</small>
          </li>
        </ul>
      </article></Link>
    </li>
  );
}
