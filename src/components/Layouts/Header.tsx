import Image from "next/image";
import type { VFC } from "react";
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";

export const Header: VFC = () => {
  return (
    <header className="h-20 flex justify-between">
      <div className="pt-6 xl:ml-48 md:ml-36 sm:ml-24 ml-12">
        <Image src="/logo.svg" width={112.48} height={24.14} alt="Qin Todo" />
      </div>
      <div className="pt-5 xl:mr-48 md:mr-36 sm:mr-24 mr-12">
        <IconContext.Provider value={{ color: "#ccc", size: "36px" }}>
          <AiOutlineUser />
        </IconContext.Provider>
      </div>
    </header>
  );
};
