import { Link2 } from "lucide-react";

interface Props {
  link: string;
}

export const Link: React.FC<Props> = ({ link }) => (
  <div className="flex flex-row items-center">
    <Link2 className="mr-2 h-4 w-4 text-accent" />
    <a
      className="text-accent font-bold text-sm"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {link.replace(/(^\w+:|^)\/\//, "")}
    </a>
  </div>
);
