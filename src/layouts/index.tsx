import type { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  return <div>{props.children}</div>;
};
