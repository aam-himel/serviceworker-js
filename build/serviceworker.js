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
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "addUserActivity") {
        const newActivity = event.data.data;
        addUserActivityToCollection(newActivity);
    }
});
// Handle events when the tab is closed or the browser is closed
self.addEventListener("beforeunload", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const storedData = localStorage.getItem("userActivityCollection");
    let userActivityCollection;
    if (storedData !== null) {
        userActivityCollection = JSON.parse(storedData);
    }
    else {
        userActivityCollection = [];
    }
    try {
        const signedUrl = yield requestSignedUrl();
        if (signedUrl) {
            yield uploadToGoogleStorage(userActivityCollection, signedUrl);
        }
    }
    catch (error) {
        console.error("Error during upload:", error.message);
    }
}));
