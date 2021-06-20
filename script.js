"use strict";

//const ping = require("ping");
const https = require("https");

// 監視対象サーバのホストを設定
const targetAddress = [""];

// Slackの投稿メッセージ
let sendMessageData = JSON.stringify({
    "username":"サーバ監視くん",
    "text": "サーバが落ちています。対象のホストを確認してください。",
    "icon_emoji":":envelope_with_arrow:"
});

// Slack Webhook情報の設定
let options = {
    hostname: "hooks.slack.com",
    port: 443,
    path: "",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(sendMessageData)
    }
};
// リクエストを投げる
let req = https.request(options, (res) =>{
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

req.write(sendMessageData);
req.end();