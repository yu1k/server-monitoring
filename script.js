"use strict";

const https = require("https");
const cron = require("node-cron");

const SlackChannelID = ""; ///動かす時に入力

function serverMonitoring(){
}

function main() {
    serverMonitoring();
    console.log("Start job.");
}
main();