"use strict";
function addUserActivityToCollection(userActivity) {
    const storedData = localStorage.getItem("userActivityCollection");
    let userActivityCollection;
    if (storedData !== null) {
        userActivityCollection = JSON.parse(storedData);
    }
    else {
        userActivityCollection = [];
    }
    userActivityCollection.push(userActivity);
    localStorage.setItem("userActivityCollection", JSON.stringify(userActivityCollection));
    console.log("Data pushed to userActivity");
}
const updateInterval = 10000;
const updateIntervalId = setInterval(() => {
    const newData = { name: "himel" };
    addUserActivityToCollection(newData);
}, updateInterval);
