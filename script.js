"use strict";

const ping = require("ping");
const https = require("https");
const cron = require("node-cron");

const SlackChannelID = ""; ///動かす時に入力

const targetAddress = ["IPアドレス"];

//targetAddress で指定したホストに対して、pingを飛ばしてホストが生きていかを確認する処理
function serverMonitoring(){
    let msg = null;
    targetAddress.forEach(function(targetAddress){
        ping.sys.probe(targetAddress, function(isAlive){
            if(!isAlive){
                msg = "host: " + targetAddress + " is dead.";
                console.log(msg);
                return;
            }
            msg = "host: " + targetAddress + " is alive.";
            console.log(msg);
        });
    });
}

function main() {
    serverMonitoring();
    console.log("Start job.");
}
main();