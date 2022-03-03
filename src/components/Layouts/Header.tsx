import Image from "next/image";
import type { VFC } from "react";
import { useUser } from "src/lib/auth";

import { UserMenu } from "../user/UserMenu";

export const Header: VFC = () => {
  const user = useUser();

  return (
    <header className="h-20 flex justify-between">
      <div className="pt-6 xl:ml-48 md:ml-36 sm:ml-24 ml-12">
        <Image src="/logo.svg" width={112.48} height={24.14} alt="Qin Todo" />
      </div>
      <div className="pt-5 xl:mr-48 md:mr-36 sm:mr-24 mr-12">
        <UserMenu user={user} />
      </div>
    </header>
  );
};
