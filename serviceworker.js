"use strict";
//our service worker
// console.log('sw running');
//new
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const v = 4;
//console.log({ self });
self.addEventListener("install", (ev) => {
    //service worker is installed.
    console.log("installed");
});
self.addEventListener("activate", (ev) => {
    //service worker is activated
    console.log("activated");
});
self.addEventListener("message", (ev) => {
    var _a;
    let data = ev.data;
    // @ts-ignore
    let clientId = (_a = ev.source) === null || _a === void 0 ? void 0 : _a.id;
    console.log("Service Worker received", data, clientId);
    if ("addPerson" in data) {
        let msg = "Thanks. Pretend I did something with the data.";
        sendMessage({
            code: 0,
            message: msg,
        });
    }
    if ("saveToLocalStorage" in data) {
        let msg = "got your local storage data, requesting url....";
        sendMessage({
            message: msg,
        });
    }
    if ("otherAction" in data) {
        let msg = "Hola";
        sendMessage({
            message: msg,
        });
    }
});
const sendMessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const allClients = yield clients.matchAll({ includeUncontrolled: true });
        return Promise.all(allClients.map((client) => {
            return client.postMessage(msg);
        }));
    }
    catch (error) {
        console.error("Error sending message:", error);
    }
});
