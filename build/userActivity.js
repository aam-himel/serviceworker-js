"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// register service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../build/serviceworker.js")
        .then((resigtration) => {
        console.log("Service worker resigterd with scope", resigtration.scope);
    })
        .catch((err) => {
        console.log("servcei worker resigtration falied:", err);
    });
}
// dynamic variable for adding different values
const newActivity = { name: "Example Activity" };
// sending data to the service worker in every 5 minutes
if ("serviceWorker" in navigator) {
    const sendMessageToServiceWorker = () => {
        var _a;
        (_a = navigator.serviceWorker.controller) === null || _a === void 0 ? void 0 : _a.postMessage({
            type: "addUserActivity",
            data: newActivity,
        });
    };
    const TIME_INTERVAL = 5 * 60 * 1000;
    setInterval(sendMessageToServiceWorker, TIME_INTERVAL);
}
// Method to add user activity to local storage
function addUserActivityToCollection(userActivity) {
    const storedData = localStorage.getItem("userActivityCollection");
    let userActivityCollection;
    if (storedData !== null) {
        userActivityCollection = JSON.parse(storedData);
    }
    else {
        userActivityCollection = [];
    }
    userActivityCollection.push(userActivity);
    localStorage.setItem("userActivityCollection", JSON.stringify(userActivityCollection));
}
// upload to googleStorage
function uploadToGoogleStorage(data, signedUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(signedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                console.log("Upload successful");
            }
            else {
                console.error("Upload failed:", response.statusText);
            }
        }
        catch (error) {
            console.error("Error during upload:", error.message);
        }
    });
}
// request a signed url
function requestSignedUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("give url here", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // changes requires
                body: JSON.stringify({
                    fileName: "userActivityCollection.json",
                    contentType: "application/json",
                }),
            });
            if (response.status === 200) {
                const signedUrl = yield response.json();
                return signedUrl;
            }
            else {
                console.error("Failed to get signed URL:", response.statusText);
                return null;
            }
        }
        catch (error) {
            console.error("Error during signed URL request:", error.message);
            return null;
        }
    });
}
