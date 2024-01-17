self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "addUserActivity") {
    const newActivity = event.data.data;
    addUserActivityToCollection(newActivity);
  }
});

// Handle events when the tab is closed or the browser is closed
self.addEventListener("beforeunload", async (event) => {
  const storedData = localStorage.getItem("userActivityCollection");

  let userActivityCollection: UserActivityCollection;

  if (storedData !== null) {
    userActivityCollection = JSON.parse(storedData);
  } else {
    userActivityCollection = [];
  }

  try {
    const signedUrl = await requestSignedUrl();
    if (signedUrl) {
      await uploadToGoogleStorage(userActivityCollection, signedUrl);
    }
  } catch (error) {
    console.error("Error during upload:", (error as Error).message);
  }
});
