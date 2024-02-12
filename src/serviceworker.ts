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

const sendMessage = async (msg: any) => {
  try {
    // @ts-ignore
    const allClients = await clients.matchAll({ includeUncontrolled: true });
    return Promise.all(
      allClients.map((client: any) => {
        return client.postMessage(msg);
      })
    );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
