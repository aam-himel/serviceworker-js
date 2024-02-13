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
// generate Url
const generateUrl = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test");
        if (response.redirected) {
            const redirectedResponse = yield fetch(response.url);
            const content = yield redirectedResponse.text();
            console.log("Content:", content);
            return content;
        }
        else {
            const content = yield response.text();
            console.log("Content:", content);
            return content;
        }
    }
    catch (error) {
        console.error("Error:", error);
        throw error;
    }
});
// get data from local storage
const getDataFromLocalStorage = () => {
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
};
const generateJsonToBlob = (activityData) => {
    const activityJSON = JSON.stringify(activityData);
    const blob = new Blob([activityJSON], { type: "application/json" });
    return blob;
};
const sentAnalyticsJsonToGCP = (signedUrl, activityFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(signedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: activityFile,
        });
        console.log("response after file upload...", response);
    }
    catch (err) {
        console.log("error after file upload....", err);
    }
});
const generateUrlAndSentFileToGCP = () => __awaiter(void 0, void 0, void 0, function* () {
    // get auth url
    const generatedUrl = yield generateUrl();
    // get data from local storage
    const localStorageData = getDataFromLocalStorage();
    // generate local file
    const fileData = generateJsonToBlob(localStorageData);
    // sent file to GCP
    sentAnalyticsJsonToGCP(generatedUrl, fileData);
});
generateUrlAndSentFileToGCP();
