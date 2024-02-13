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
const getSignedUrlAndSentDataToGCP = (activityData) => {
    const activityJSON = JSON.stringify(activityData);
    // generate json file
    const blob = new Blob([activityJSON], { type: "application/json" });
    const fileName = "activity.json";
    const expiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    // options for signed URL
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    // Fetch the signed URL from your server
    // fetch(
    //   `https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test`
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Failed to obtain signed URL");
    //     }
    //     return response.json();
    //   })
    //   .then(({ signedUrl }) => {
    //     console.log("signed url", signedUrl);
    //     return fetch(signedUrl, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: blob,
    //     });
    //   })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Failed to upload JSON data to GCS");
    //     }
    //     console.log("JSON data uploaded successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    fetch("https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test")
        .then((value) => {
        console.log(value);
    })
        .catch((err) => console.log("error", err));
};
function getDataFromLocalStorage() {
    const storedData = localStorage.getItem("userActivityCollection");
    console.log("Stored data:", storedData);
    let userActivityCollection;
    if (storedData !== null) {
        try {
            userActivityCollection = JSON.parse(storedData);
        }
        catch (error) {
            console.error("Error parsing JSON:", error);
            return [];
        }
    }
    else {
        userActivityCollection = [];
    }
    return userActivityCollection;
}
// const localdata: any = getDataFromLocalStorage();
// getSignedUrlAndSentDataToGCP(localdata);
const generateUrl = () => __awaiter(void 0, void 0, void 0, function* () {
    // fetch(
    //   "https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test"
    // )
    //   .then((value: Response) => {
    //     // Specify Response type
    //     console.log(value);
    //   })
    //   .catch((err) => console.log("error", err));
    fetch(`https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test`)
        .then((res) => res.json())
        .then((res) => {
        // res is now an Actor
        console.log(res);
        return res;
    });
});
document.addEventListener("DOMContentLoaded", APP.init);
document.addEventListener("message", (ev) => {
    console.log("new messge received!");
});
