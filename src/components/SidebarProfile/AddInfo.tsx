import { GitHubUser } from "@/services/api";
import {
  Building,
  Instagram,
  Link,
  MapPin,
  Twitter,
} from "lucide-react";

interface AddInfoProps {
  user: GitHubUser;
}

export const AddInfo = ({ user }: AddInfoProps) => {
  const infos = [
    {
      icon: <Building size={16} className="text-app-primary" />,
      label: user.company,
      href: null,
    },
    {
      icon: <MapPin size={16} className="text-app-primary" />,
      label: user.location,
      href: null,
    },
    {
      icon: <Link size={16} className="text-app-primary" />,
      label: user.blog,
      href: user.blog,
    },
    {
      icon: <Twitter size={16} className="text-app-primary" />,
      label: user.twitter_username,
      href: user.twitter_username
        ? `https://twitter.com/${user.twitter_username}`
        : null,
    },
    {
      icon: <Instagram size={16} className="text-app-primary" />,
      label: "Instagram",
      href: "https://instagram.com/gabriel.s.cordeiro",
    },
  ].filter((info) => info.label);

  return (
    <ul className="flex flex-col gap-4 w-full bg-app-gray-300 p-4 rounded-2xl sm:bg-transparent sm:p-0">
      {infos.map((info, index) => (
        <li key={index} className="flex gap-2 items-center">
          {info.icon}
          {info.href ? (
            <a
              href={info.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-app-primary text-sm hover:underline focus:underline outline-none font-normal"
              tabIndex={0}
              aria-label={info.label!}
            >
              {info.label}
            </a>
          ) : (
            <span
              className="text-app-primary text-sm font-normal"
              aria-label={info.label!}
            >
              {info.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
