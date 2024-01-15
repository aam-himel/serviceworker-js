"use strict";
// serviceworker.ts
// Function to set dummy local storage data
function setDummyLocalStorageData() {
    const data = [{ name: 'mamun' }];
    localStorage.setItem('userActivityCollection', JSON.stringify(data));
}
// Function to process data if it exists in local storage
function processData(data) {
    // Your logic to process the data goes here
    console.log('Processing data:', data);
}
// Function to check local storage and call processData
function checkLocalStorageAndProcessData() {
    const storedData = localStorage.getItem('userActivityCollection');
    if (storedData !== null) {
        const userActivityCollection = JSON.parse(storedData);
        processData(userActivityCollection);
    }
    else {
        console.log('No data found in local storage.');
    }
}
// Interval for checking local storage (5 minutes in milliseconds)
const CHECK_INTERVAL = 5000;
// Set up an interval to check local storage every 5 minutes
setInterval(checkLocalStorageAndProcessData, CHECK_INTERVAL);
// Add an event listener to listen for install event
self.addEventListener('install', (event) => {
    // Perform installation steps if needed
    console.log('Service Worker installed');
    self.skipWaiting(); // Activate service worker immediately
});
// Add an event listener to listen for activate event
self.addEventListener('activate', (event) => {
    // Perform activation steps if needed
    console.log('Service Worker activated');
    clients.claim(); // Take control of all open pages
});
// Add an event listener to intercept fetch requests
self.addEventListener('fetch', (event) => {
    // Your custom fetch handling logic goes here
    // You can customize the behavior for fetching resources
    // or caching strategies, but for this example, we won't modify it.
    event.respondWith(fetch(event.request));
});
// Call setDummyLocalStorageData to initialize local storage with dummy data
setDummyLocalStorageData();
