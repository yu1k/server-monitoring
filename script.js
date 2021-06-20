"use strict";

const ping = require("ping");
const https = require("https");
const cron = require("node-cron");

// 監視対象サーバのホストを設定する。`,` で区切れば複数のホストを指定することが可能
const targetAddress = [""];

// Slackに送信する関数
function sendSlack(host){
    // Slackの投稿メッセージ
    let massageData = JSON.stringify({
        "username": "サーバ監視くん",
        "text": "監視対象のサーバが落ちています。ホスト: " + host +  " を確認してください。",
        "icon_emoji": ":envelope_with_arrow:"
    });

    // Slack Webhook情報の設定
    let options = {
        hostname: "hooks.slack.com",
        port: 443,
        path: "", // `/services/AAAAA/BBBBB/ccccc`の形式で設定
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(massageData)
        }
    };

    // リクエストを投げる
    let req = https.request(options, (res) => {
        if(res.statusCode === 200){
            console.log("OK: " + res.statusCode);
        }
        else{
            console.log("Status Error: " + res.statusCode);
        }
    });

    // エラー
    req.on("error", (err) => {
        console.error(err);
    });

    // データ送信
    req.write(massageData);
    req.end();
    console.log(massageData);
}

// サーバ監視を実行する関数
function serverMonitoring(){
    targetAddress.forEach(function(host){
        ping.sys.probe(host, function(isAlive){
            if(!isAlive){
                sendSlack(host);
                console.log("Host: " + host + " is dead");
            }
            else{
                console.log("Host: " + host + " is alive");
            }
        });
    });
}

// 2分毎に `serverMonitoring();` を実行
cron.schedule("0 */2 * * * *", () => {
    serverMonitoring();
});

