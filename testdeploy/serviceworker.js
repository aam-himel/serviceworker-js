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
const v = 1;
// --------- get data from local storage ----------
// reveving data from main script on every 5 minutes
// self.addEventListener("message", async (ev) => {
//   let data = ev.data;
//   // @ts-ignore
//   let clientId = ev.source?.id;
//   console.log("Service Worker received", data, clientId);
//   if (data.saveActivity) {
//     const localData: UserActivityCollection = await getDataFromLocalStorage();
//     await getSignedUrlAndSentDataToGCP(localData);
//     sendMessage("saved successfully!");
//   }
// });
// --------- cloud storage ---------------------
// const getSignedUrlAndSentDataToGCP = (activityData: UserActivityCollection) => {
//   const activityJSON = JSON.stringify(activityData);
//   // generate json file
//   const blob = new Blob([activityJSON], { type: "application/json" });
//   const fileName = "test.json";
//   const expiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();
//   // options for signed URL
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ fileName, expiration }),
//   };
//   // Fetch the signed URL from your server
//   fetch(
//     `https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=${fileName}`,
//     requestOptions
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to obtain signed URL");
//       }
//       return response.json();
//     })
//     .then(({ signedUrl }) => {
//       return fetch(signedUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: blob,
//       });
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to upload JSON data to GCS");
//       }
//       console.log("JSON data uploaded successfully");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };
// --------------- other listeners  --------------
self.addEventListener("install", (ev) => {
    console.log("installed");
});
self.addEventListener("activate", (ev) => {
    console.log("activated");
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
