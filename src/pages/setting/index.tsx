import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/layouts/setting";

const LISTS = [
  {
    head: "設定",
    items: [
      { label: "プロフィール", href: "/setting/profile" },
      { label: "アカウント", href: "/setting/account" },
      { label: "テーマ", href: "/setting/theme", value: "OSの設定に合わせる" },
    ],
  },
  {
    head: "サポート",
    items: [
      { label: "プライバシーポリシー", href: "/setting/privacy" },
      { label: "利用規約", href: "/setting/terms" },
      { label: "オープンソースライセンス", href: "*****" },
      { label: "お問い合わせ", href: "*****" },
      { label: "バージョン", value: "1.0.0" },
    ],
  },
];

const Setting: NextPage = () => {
  return (
    <Layout title="設定" backLink="/">
      <div className="space-y-4">
        {LISTS.map((list) => {
          return (
            <div key={list.head}>
              <p className="text-sm font-bold text-gray-400">{list.head}</p>
              <ul>
                {list.items.map((item) => {
                  const className =
                    "flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold";
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <Link href={item.href}>
                          <a
                            className={`${className} hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none`}
                          >
                            {item.label}
                            <div className="flex space-x-4 items-center">
                              <div>{item.value && item.value}</div>
                              {item.href.slice(0, 1) === "/" ? (
                                <ChevronRightIcon className="w-5 h-5" />
                              ) : (
                                <ExternalLinkIcon className="w-5 h-5" />
                              )}
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <div className={className}>
                          {item.label}
                          <div>{item.value && item.value}</div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Setting;
