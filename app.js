require("electron");
const DiscordRPC = require("discord-rpc");
const parse = require("parse-duration");
const moment = require("moment");
const openTimestamp = new Date();
DiscordRPC.register("380058252123308035");

const rpc = new DiscordRPC.Client({ transport: "ipc" });

async function setActivity() {
    if (!rpc) return;

    rpc.setActivity({
        details: "Best Multi-Purpose Bot!",
        state: "https://pengubot.com",
        largeImageKey: "pengu_logo",
        largeImageText: "PenguBot",
        instance: false,
        startTimestamp: moment(openTimestamp).add(parse("-0s"), "ms").toDate()
    });
}

rpc.on("ready", () => {
    console.log("Logged in with RPC!");
    setActivity();
});

rpc.login("380058252123308035").catch(console.error);
