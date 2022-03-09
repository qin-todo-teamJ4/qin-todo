import type { ReactNode, VFC } from "react";

import { Header } from "./Header";

type Props = {
  title: string;
  backLink: string;
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <>
      <Header backLink={props.backLink} title={props.title} />
      <div className="px-4 mx-auto pt-8 pb-20 w-full max-w-screen-sm">
        {props.children}
      </div>
    </>
  );
};
