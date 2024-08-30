# TechBlog

**TechBlog**は、[Next.js](https://nextjs.org/) と [TypeScript](https://www.typescriptlang.org/) を使用して構築されたモダンなブログプラットフォームです。
本プロジェクトは、Qiita と MicroCMS の API を利用してカスタマイズ可能なブログサイトを簡単に構築できるように設計されています。

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [動作環境](#動作環境)
3. [セットアップ手順](#セットアップ手順)
4. [使用技術](#使用技術)
5. [デプロイ方法](#デプロイ方法)

## プロジェクト概要

**TechBlog**は、開発者向けに設計されたブログプラットフォームです。Qiita に投稿した記事を取得して表示させたり、MicroCMS に投稿したブログ記事を連携させて表示させることができます。様々なプラットフォームで投稿したブログ記事を一つのサイトに集約して表示させることができます。

## 動作環境

- Node.js v18 以上
- npm または yarn

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/acu8/techblog.git
cd techblog
```

## 2. 依存パッケージのインストール

```bash
npm install
```

または

```bash
yarn install
```

## 3. 環境変数の設定

プロジェクトルートに.env.local ファイルを作成し、以下の環境変数を設定してください：

```bash
QIITA_API_TOKEN="yours"
QIITA_USER_ID="yours"
MICROCMS_API_KEY="yours"
MICROCMS_API_URL="yours"
```

## 4. 開発サーバーの起動

```bash
npm run dev
```

または

```bash
yarn dev
```

ブラウザで http://localhost:3000 を開き、TechBlog の開発環境を確認してください。

## 使用技術

Next.js - サーバーサイドレンダリングと静的サイト生成に対応した React フレームワーク。
TypeScript - 型安全な開発を可能にする JavaScript のスーパーセット。
Supabase - リアルタイムデータベースと認証を提供するオープンソースの Firebase 代替。
daisyUI - Tailwind CSS をベースにした UI コンポーネントライブラリ。
React Testing Library - コンポーネントのテストを支援するライブラリ。

## デプロイ方法

Vercel または Netlify などのプラットフォームを使用して簡単にデプロイできます。
本プロジェクトは、Firebase を利用しています。

```bash
vercel
```

または

```bash
netlify deploy
```

環境変数はホスティングプラットフォーム上でも設定可能です。
