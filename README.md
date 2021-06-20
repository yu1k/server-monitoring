# server-monitoring

## 環境

Docker Desctop

Node.js v14.15.4

## 使い方

```
$ git clone git@github.com:yu1k/server-monitoring.git
$ cd ./server-monitoring
```

以上のコマンドで GitHub からリポジトリをcloneし、cd でディレクトリに移動する

1. アラートを投げたい Slackワークスペース にてWebhookインテグレーションを作成する
2. `./script.js` の 8行目  に監視対象のホストを入力する
3. `./script.js` の 23行目 に 1で作成したWebhookインテグレーションURLの `https://hooks.slack.com` 以降のPATHを `/services/AAAAA/BBBBB/ccccc` の形式で設定する
4. 死活監視の定期実行の時間を初期設定の30分ごとから変更したい場合は、 `./script.js` の 68行目 の cron の設定を変更する
5. `$ docker-compose up -d` コマンドでアプリケーションを起動する

## やりたいこと

- 管理しているサーバに定期的に ping を投げて監視する（5分ごと？）
- サーバが落ちていたら、 Webhook 経由で Slack に通知を飛ばす
