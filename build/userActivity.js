"use strict";
var _a, _b, _c, _d;
var testActivity1 = {
    type: "type1",
    count: 111,
};
var testActivity2 = {
    type: "type2",
    count: 3434,
};
var testActivity3 = {
    type: "type3",
    count: 232,
};
var testActivity4 = {
    type: "type4",
    count: 112,
};
const APP = {
    SW: null,
    activityValue: {
        name: "",
    },
    init() {
        APP.registerSW();
    },
    registerSW() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("../serviceworker.js", {
                scope: "/",
            })
                .then((registration) => {
                // @ts-ignore
                APP.SW =
                    registration.installing ||
                        registration.waiting ||
                        registration.active;
                console.log("service worker registered");
            });
            if (navigator.serviceWorker.controller) {
                console.log("we have a service worker installed");
            }
            navigator.serviceWorker.oncontrollerchange = (ev) => {
                console.log("New service worker activated");
            };
        }
        else {
            console.log("Service workers are not supported.");
        }
    },
    sendMessage(msg) {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage(msg);
        }
    },
    onMessage({ data }) {
        console.log("Web page receiving", data);
    },
};
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
(_a = document.getElementById("activity1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    if (testActivity1.type === "type1") {
        addUserActivityToCollection(testActivity1);
    }
});
(_b = document.getElementById("activity2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    if (testActivity2.type === "type2") {
        addUserActivityToCollection(testActivity2);
    }
});
(_c = document.getElementById("activity3")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    if (testActivity3.type === "type3") {
        addUserActivityToCollection(testActivity3);
    }
});
(_d = document.getElementById("activity4")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    if (testActivity4.type === "type4") {
        addUserActivityToCollection(testActivity4);
    }
});
document.addEventListener("DOMContentLoaded", APP.init);
document.addEventListener("message", (ev) => {
    console.log("new messge received!");
});
// const TIMEINTERVAL = 60 * 1000;
// setInterval(() => {
//   const saveActivity = {
//     saveActivity: {
//       id: 123,
//       name: "John Doe",
//       age: 30,
//     },
//   };
//   APP.sendMessage(saveActivity);
// }, TIMEINTERVAL);
