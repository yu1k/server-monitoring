"use strict";

const https = require("https");
const cron = require("node-cron");

const SlackChannelID = ""; ///動かす時に入力

const targetAddress = ""; //対象のサーバーのIPアドレス
const exec = require('child_process').exec; //コマンド実行用

module.exports = (robot) => {

    function serverMonitoring(){
        cron.schedule("* * * * *", () => {
            exec("ping -c 1 targetAddress", (err, stdout , stderr) => {

                //この処理だとpingのパケットロスではなく、シェルのエラーを拾う処理なのでコードを改善したい
                //pingのログに出たパケットロス100%などの文字列を比較して判定するのも良さそう
                if(err){
                    robot.messageRoom("bot-test", targetAddress + " が落ちてます");
                }
                else{
                    console.log(stdout);
                }
            });
        });
    }

    function main(){
        serverMonitoring();
        console.log("Start job.");
    }
    main();
};