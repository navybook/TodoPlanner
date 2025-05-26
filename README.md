# TodoPlanner

## 概要
このアプリケーションは、ReactとRuby on Railsを使用して作成されたシンプルなタスク管理ツールです。  
ユーザーが日々のタスクを管理し、進捗状況を簡単に確認できるよう設計されています。

## MVP
以下の基本機能を備えたタスク管理アプリを目指します。

### ユーザー管理
- **ユーザー登録**: 新規ユーザーがアカウントを作成可能。
- **ログイン**: 登録済みユーザーがログインして自身のタスクを管理可能。

### タスク管理機能
1. **タスクの作成**  
  - タスクのタイトル、説明、期限を入力し、新しいタスクを作成。
2. **タスクの一覧表示**  
  - すべてのタスクをリスト形式で表示。  
  - 各タスクのステータス（未完了/完了）を確認可能。
3. **タスクの更新**  
  - タスクのタイトル、説明、期限を編集可能。
4. **タスクの削除**  
  - 不要なタスクを削除可能。
5. **ステータスの更新**  
  - タスクを「完了」または「未完了」に切り替え可能。
6. **タスクの検索・フィルタリング機能**  
  - タスクをキーワードやステータスで検索・フィルタリング。

## 今後の拡張機能
以下の機能を追加することで、さらに便利なアプリへ発展させます。
1. **リマインダー機能**  
  - 期限が近づいたタスクに通知を送る機能を追加。
2. **カレンダー表示機能**  
  - タスクの期限をカレンダー形式で表示。
3. **複数ユーザー対応**  
  - チーム単位でタスクを共有・管理。

## 使用技術
- **フロントエンド**: React
- **バックエンド**: Ruby on Rails
- **データベース**: PostgreSQL

## データ設計
1. Usersテーブル
ユーザーの情報を管理する
- id (bigint): ユーザーID。
- name (string): ユーザー名。
- email (string): ユーザーのメールアドレス。
- crypted_password (string): ハッシュ化されたユーザーのパスワード。
- salt (string): ユーザーのパスワード。
- created_at (datetime): 作成日時。
- updated_at (datetime): 更新日時。

2. Tasksテーブル
タスクの情報を管理する
- id (bigint): タスクID。
- title (string): タスクのタイトル。
- description (text): タスクの詳細。
- due_date (datetime): タスクの期限。
- status (integer): タスクの状態（0: 未完了,1: 着手, 2: 完了）。
- user_id (bigint): タスク作成者のユーザーID（Usersテーブルとの関連）。
- created_at (datetime): 作成日時。
- updated_at (datetime): 更新日時。

## アプリ機能
| タスク作成 | タスク更新 |
|:-----------:|:------------:|
| [![Image from Gyazo](https://i.gyazo.com/a79c0488444a43bec77ba39d3a229529.gif)](https://gyazo.com/a79c0488444a43bec77ba39d3a229529) | [![Image from Gyazo](https://i.gyazo.com/bb1baac872d1788bd1f2b029d7235b1f.gif)](https://gyazo.com/bb1baac872d1788bd1f2b029d7235b1f) |

</br>

| タスク削除 | ソート機能 |
|:-----------:|:------------:|
| [![Image from Gyazo](https://i.gyazo.com/a1582e23e86757f3a010591a2177c51f.gif)](https://gyazo.com/a1582e23e86757f3a010591a2177c51f) | [![Image from Gyazo](https://i.gyazo.com/56163b768bdd3bf45113f538ea31eb41.gif)](https://gyazo.com/56163b768bdd3bf45113f538ea31eb41) |
