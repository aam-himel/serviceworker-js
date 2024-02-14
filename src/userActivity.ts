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
