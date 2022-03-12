import { CheckIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { Layout } from "src/layouts/setting";

const Theme: NextPage = () => {
  return (
    <Layout title="テーマ" backLink="/setting">
      <ul>
        {["端末の設定に合わせる", "ライト", "ダーク"].map((item) => {
          return (
            <li
              key={item}
              className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none"
            >
              {item}
              <CheckIcon className="w-6 h-6 text-blue-500" />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Theme;
