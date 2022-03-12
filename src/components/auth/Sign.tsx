import { useRouter } from "next/router";
import type { VFC } from "react";
import { Button } from "src/components/button";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { appleSignin, googleSignin, useUser } from "src/lib/auth";

type SignProps = { page: "signin" | "signup" };

export const Sign: VFC<SignProps> = (props) => {
  const router = useRouter();
  const user = useUser();
  if (user !== null) router.push("/");

  return (
    <div className="grid place-items-center w-screen h-screen bg-gray-200 dark:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-center">
          <img src="/logo.svg" alt="Qin Todo" width={192} height={36.6} />
        </div>
        <div className="mt-20 space-y-5">
          <Button
            variant="solid-white"
            className="py-4 w-72 sm:w-80"
            onClick={googleSignin}
          >
            <div className="flex">
              <GoogleIcon className="mr-3 w-6 h-6" />
              <span>
                {props.page === "signin"
                  ? "Googleでログイン"
                  : "Googleでアカウント作成"}
              </span>
            </div>
          </Button>
          <Button
            variant="solid-black"
            className="py-4 w-72 sm:w-80"
            onClick={appleSignin}
          >
            <div className="flex">
              <AppleIcon className="mr-3 w-6 h-6" />
              <span>
                {props.page === "signin"
                  ? "Appleでログイン"
                  : "Appleでアカウント作成"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
