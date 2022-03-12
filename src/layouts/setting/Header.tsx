import { ChevronLeftIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import type { VFC } from "react";

type Props = {
  title: string;
  backLink: string;
};

export const Header: VFC<Props> = (props) => {
  return (
    <header className="h-20">
      <div className="flex pt-6 xl:mx-48 md:mx-36 sm:mx-24 mx-12">
        <Link href={props.backLink}>
          <a>
            {props.backLink === "/" ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </a>
        </Link>
        <p className="m-auto font-bold text-lg">{props.title}</p>
      </div>
    </header>
  );
};
