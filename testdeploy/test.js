"use strict";
console.log("api test loading...");
const generateTestUrl = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test", {
        method: "GET", // Specify the HTTP method
        headers: headers, // Pass the headers object
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return response.json();
    })
        .then((data) => {
        console.log(data);
    })
        .catch((error) => {
        console.error("Error:", error);
    });
};
generateTestUrl();
