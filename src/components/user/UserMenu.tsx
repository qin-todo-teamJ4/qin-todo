import { Popover, Transition } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import type { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { Fragment } from "react";
import { logout } from "src/lib/auth";

import { Avatar } from "./Avatar";

export const UserMenu: VFC<{ user: User | null }> = (props) => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/signin");
  };

  return (
    <Popover className="grid">
      {({ open }) => {
        return (
          <>
            <Popover.Button className="flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              <Avatar user={props.user} size={40} className="rounded-full" />
            </Popover.Button>

            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute left-full z-10 pl-8 mt-2 w-screen max-w-xs -translate-x-full sm:px-0 sm:max-w-sm xl:-left-full xl:-translate-x-1/2 2xl:left-1/2"
                >
                  <div className="overflow-hidden py-4 bg-white rounded-2xl ring-1 ring-gray-200 shadow-lg">
                    <div className="grid relative">
                      <Link href="/setting">
                        <a className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none">
                          <div className="flex shrink-0 justify-center items-center">
                            <CogIcon className="w-7 h-7" />
                          </div>
                          <p className="ml-4 font-bold">設定</p>
                        </a>
                      </Link>
                      <button
                        type="button"
                        className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none"
                        onClick={handleLogout}
                      >
                        <div className="flex shrink-0 justify-center items-center">
                          <LogoutIcon className="ml-0.5 w-7 h-7 text-red-500" />
                        </div>
                        <p className="ml-4 font-bold text-red-500">
                          ログアウト
                        </p>
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
