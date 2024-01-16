// serviceworker.ts

// Define the type for the data in local storage
interface UserActivity {
    name: string;
  }
  
  // Function to set dummy local storage data
  function setDummyLocalStorageData(): void {
    const data: UserActivity[] = [{ name: 'mamun' }];
    localStorage.setItem('userActivityCollection', JSON.stringify(data));
  }
  
  // Function to process data if it exists in local storage
  function processData(data: UserActivity[]): void {
    console.log('Processing data:', data);
  }
  
  // Function to check local storage and call processData
  function checkLocalStorageAndProcessData(): void {
    const storedData = localStorage.getItem('userActivityCollection');
  
    if (storedData !== null) {
      const userActivityCollection: UserActivity[] = JSON.parse(storedData);
      processData(userActivityCollection);
    } else {
      console.log('No data found in local storage.');
    }
  }
  
  const CHECK_INTERVAL = 5000;
  
  // Set up an interval to check local storage every 5 minutes
  setInterval(checkLocalStorageAndProcessData, CHECK_INTERVAL);
  
  // Add an event listener to listen for install event
  self.addEventListener('install', (event: ExtendableEvent) => {
    console.log('Service Worker installed');
  
    self.skipWaiting();
  });
  
  // Add an event listener to listen for activate event
  self.addEventListener('activate', (event: ExtendableEvent) => {
    console.log('Service Worker activated');
    clients.claim(); // Take control of all open pages
  });
  
  // Add an event listener to intercept fetch requests
  self.addEventListener('fetch', (event: FetchEvent) => {
    //Fetch logic
    event.respondWith(fetch(event.request));
  });
  
  // Call setDummyLocalStorageData to initialize local storage with dummy data
  setDummyLocalStorageData();
  