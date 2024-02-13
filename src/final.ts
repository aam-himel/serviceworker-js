// generate Url
const generateUrl = async (): Promise<string> => {
  try {
    const response = await fetch(
      "https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test"
    );
    if (response.redirected) {
      const redirectedResponse = await fetch(response.url);
      const content = await redirectedResponse.text();
      console.log("Content:", content);
      return content;
    } else {
      const content = await response.text();
      console.log("Content:", content);
      return content;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// get data from local storage
const getDataFromLocalStorage = (): UserActivityCollection => {
  const storedData = localStorage.getItem("userActivityCollection");

  console.log("Stored data:", storedData);

  let userActivityCollection: UserActivityCollection;

  if (storedData !== null) {
    try {
      userActivityCollection = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  } else {
    userActivityCollection = [];
  }
  return userActivityCollection;
};

const generateJsonToBlob = (activityData: UserActivityCollection): Blob => {
  const activityJSON = JSON.stringify(activityData);
  const blob = new Blob([activityJSON], { type: "application/json" });
  return blob;
};

const sentAnalyticsJsonToGCP = async (
  signedUrl: string,
  activityFile: Blob
): Promise<void> => {
  try {
    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: activityFile,
    });

    console.log("response after file upload...", response);
  } catch (err) {
    console.log("error after file upload....", err);
  }
};

const generateUrlAndSentFileToGCP = async (): Promise<void> => {
  // get auth url
  const generatedUrl = await generateUrl();

  // get data from local storage
  const localStorageData = getDataFromLocalStorage();

  // generate local file
  const fileData: Blob = generateJsonToBlob(localStorageData);

  // sent file to GCP
  sentAnalyticsJsonToGCP(generatedUrl, fileData);
};

generateUrlAndSentFileToGCP();
