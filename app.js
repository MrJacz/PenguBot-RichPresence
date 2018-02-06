const { app, BrowserWindow } = require("electron");
const DiscordRPC = require("discord-rpc");
const parse = require("parse-duration");
const moment = require("moment");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
    const width = 500;
    const height = 420;
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        vibrancy: "dark"
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "src", "index.html"),
        protocol: "file:",
        slashes: true
    }));

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
    if (!mainWindow) createWindow();
});


DiscordRPC.register("380058252123308035");
const rpc = new DiscordRPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
    console.log("Logged in with RPC!");
    setActivity();
});

rpc.login("380058252123308035").catch(error => {
    console.error(error);
    process.exit(1);
});

function setActivity() {
    if (!rpc) throw "There isn't a RPC!";
    rpc.setActivity({
        details: "Best Multi-Purpose Bot!",
        state: "pengubot.com",
        largeImageKey: "pengu_logo",
        largeImageText: "PenguBot",
        instance: false,
        startTimestamp: moment(new Date()).add(parse("-0s"), "ms").toDate()
    });
}
