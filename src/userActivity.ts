interface UserActivity {
  name: string;
}

type UserActivityCollection = UserActivity[];



const APP = {
  SW: null,

  activityValue: {
    name: ''
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

      navigator.serviceWorker.addEventListener("message", APP.onMessage);
      let person = {
        id: Date.now(),
        name: "mamun",
        color: "blue1",
      };
      APP.sendMessage({ addPerson: person });
    } else {
      console.log("Service workers are not supported.");
    }
  },

  sendMessage(msg:any) {
    //send some structured-cloneable data from the webpage to the sw
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  },
  onMessage({ data } : any) {
    //got a message from the service worker
    console.log("Web page receiving", data);
  },
};


// APP.sendMessage({ saveToLocalStorage: userActivity });

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

const newActivity = { name: "Example Activity" };

// if on click local storage set is required
// document.getElementById('activity')?.addEventListener('click', () => {
//   addUserActivityToCollection(newActivity);
// })

const TIME_INTERVAL =  5 * 60 * 1000;

setInterval(() => {
  addUserActivityToCollection(newActivity);
},TIME_INTERVAL)

document.addEventListener("DOMContentLoaded", APP.init);
