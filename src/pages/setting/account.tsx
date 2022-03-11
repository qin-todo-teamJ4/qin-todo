import type { NextPage } from "next";
import { Button } from "src/components/button";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Layout } from "src/layouts/setting";

const Account: NextPage = () => {
  return (
    <Layout title="アカウント" backLink="/setting">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-400">アカウントの連携</p>
          <ul>
            <li className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold">
              <p className="flex items-center">
                <GoogleIcon className="w-6 mr-4" />
                Google
              </p>
              <Button variant="solid-gray" className="py-1.5 px-6">
                解除する
              </Button>
            </li>
            <li className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold">
              <p className="flex items-center">
                <AppleIcon className="w-6 mr-4" />
                Apple
              </p>
              <Button variant="solid-blue" className="py-1.5 px-6">
                連携する
              </Button>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-400">アカウントの操作</p>
          <ul>
            {["ログアウト", "アカウント削除"].map((item) => {
              return (
                <li
                  key={item}
                  className="py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none"
                >
                  <p className="text-red-500">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
