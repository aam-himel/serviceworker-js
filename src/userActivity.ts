interface ActivityType1 {
  type: "type1";
  count: number;
}
interface ActivityType2 {
  type: "type2";
  count: number;
}
interface ActivityType3 {
  type: "type3";
  count: number;
}
interface ActivityType4 {
  type: "type4";
  count: number;
}

type UserActivity =
  | ActivityType1
  | ActivityType2
  | ActivityType3
  | ActivityType4;

type UserActivityCollection = UserActivity[];

var testActivity1: ActivityType1 = {
  type: "type1",
  count: 111,
};
var testActivity2: ActivityType2 = {
  type: "type2",
  count: 3434,
};
var testActivity3: ActivityType3 = {
  type: "type3",
  count: 232,
};
var testActivity4: ActivityType4 = {
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
    } else {
      console.log("Service workers are not supported.");
    }
  },

  sendMessage(msg: any) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  },
  onMessage({ data }: any) {
    console.log("Web page receiving", data);
  },
};

function addUserActivityToCollection(userActivity: UserActivity): void {
  const storedData = localStorage.getItem("userActivityCollection");

  let userActivityCollection: UserActivityCollection;

  if (storedData !== null) {
    userActivityCollection = JSON.parse(storedData);
  } else {
    userActivityCollection = [];
  }

  userActivityCollection.push(userActivity);
  localStorage.setItem(
    "userActivityCollection",
    JSON.stringify(userActivityCollection)
  );
}

document.getElementById("activity1")?.addEventListener("click", function () {
  if (testActivity1.type === "type1") {
    addUserActivityToCollection(testActivity1);
  }
});
document.getElementById("activity2")?.addEventListener("click", function () {
  if (testActivity2.type === "type2") {
    addUserActivityToCollection(testActivity2);
  }
});
document.getElementById("activity3")?.addEventListener("click", function () {
  if (testActivity3.type === "type3") {
    addUserActivityToCollection(testActivity3);
  }
});
document.getElementById("activity4")?.addEventListener("click", function () {
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
const getSignedUrlAndSentDataToGCP = (activityData: UserActivityCollection) => {
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

  fetch(
    "https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test"
  )
    .then((value) => {
      console.log(value);
    })
    .catch((err) => console.log("error", err));
};

function getDataFromLocalStorage(): UserActivityCollection {
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
}

// const localdata: any = getDataFromLocalStorage();
// getSignedUrlAndSentDataToGCP(localdata);

const generateUrl = async () => {
  // fetch(
  //   "https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test"
  // )
  //   .then((value: Response) => {
  //     // Specify Response type
  //     console.log(value);
  //   })
  //   .catch((err) => console.log("error", err));

  fetch(
    `https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test`
  )
    .then((res) => res.json())
    .then((res: any) => {
      // res is now an Actor
      console.log(res);
      return res;
    });
};

document.addEventListener("DOMContentLoaded", APP.init);
document.addEventListener("message", (ev) => {
  console.log("new messge received!");
});
