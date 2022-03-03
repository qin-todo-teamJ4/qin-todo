import type { User } from "firebase/auth";
import type { VFC } from "react";

type Props = {
  user: User | null;
  size: number;
  className: string;
};
export const Avatar: VFC<Props> = (props) => {
  return (
    <img
      src={props.user?.photoURL || ""}
      alt={props.user?.displayName || "current user icon"}
      width={props.size}
      height={props.size}
      className={props.className}
    />
  );
};
