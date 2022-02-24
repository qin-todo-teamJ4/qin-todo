# Qin todo

- [React](https://ja.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Mock Service Worker](https://mswjs.io/)
- [Vitest](https://vitest.dev/)
- [SWR](https://swr.vercel.app/ja)
- [Recoil](https://recoiljs.org/)
- 認証：[Firebase](https://firebase.google.com/) + [NextAuth.js](https://next-auth.js.org/)
- 本番環境：[Firebase Hosting](https://firebase.google.com/docs/hosting?hl=ja)

## Design
- [Figma](https://www.figma.com/file/SNPCXNu0V6k6wHS4piYyS2/Qin-Todo?node-id=0%3A1)

## Develop

開発を行う場合

```bash
yarn dev // localhost:3000 で起動
```
本番の動作確認を行う場合

```bash
yarn build
yarn start // localhost:3000 で起動。dev中はportを変える必要があります。
```

## Git Branch

`main`

- 本番環境

`develop`

- ステージング環境
- 常駐しているブランチで、feature からの変更を受け付け、main にマージする。

`hotfix`

- 本番で発生した緊急のバグに対処するためのブランチ。
- 必ず main から分岐し、main と develop にマージする。

`feature/あなたのGitHub名-*`

- 開発にはここを用いる。
- 必ず developを最新にしてからから分岐し、PRを作成後develop にマージする。
- `*` は開発する対象の ISSUE の番号を記入。
- 例: feature/openfruits-#1

`main`, `develop`, `hotfix` に直接 push してはいけません。基本的に皆さんが触って良いのは `feature/あなたのGitHub名_*` ブランチだけです。

## Commit Message

- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- perf: パフォーマンス向上関連
- test: テスト関連
- chore: ビルド、補助ツール、ライブラリ関連
