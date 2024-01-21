interface UserActivity {
  name: string;
}

type UserActivityCollection = UserActivity[];
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
  console.log("Data pushed to userActivity");
}
const updateInterval = 10000;
const updateIntervalId = setInterval(() => {
  const newData: UserActivity = { name: "himel" };
  addUserActivityToCollection(newData);
}, updateInterval);
