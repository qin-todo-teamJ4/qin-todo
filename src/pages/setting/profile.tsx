import type { NextPage } from "next";
import { Button } from "src/components/button";
import { Avatar } from "src/components/user/Avatar";
import { Layout } from "src/layouts/setting";
import { useUser } from "src/lib/auth";

const Profile: NextPage = () => {
  const user = useUser();

  return (
    <Layout title="プロフィール" backLink="/setting">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-400">アイコン</p>
          <div className="flex justify-start items-center space-x-6">
            <Avatar user={user} size={96} />
            <Button variant="solid-gray" className="py-2.5 px-5 mt-4">
              変更する
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-400">名前</p>
          <input
            type="text"
            value={user?.displayName || ""}
            className="p-2 w-full rounded-2xl bg-gray-100 border-transparent"
          />
        </div>
        <Button type="submit" variant="solid-blue" className="p-3 w-full">
          保存する
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;
