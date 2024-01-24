//our service worker
// console.log('sw running');
//new

const v = 4;

//console.log({ self });
self.addEventListener("install", (ev) => {
  //service worker is installed.
  console.log("installed");
});
self.addEventListener("activate", (ev) => {
  //service worker is activated
  console.log("activated");
});

self.addEventListener("message", (ev) => {
  let data = ev.data;
  // @ts-ignore
  let clientId = ev.source?.id;
  console.log("Service Worker received", data, clientId);
  if ("addPerson" in data) {
    let msg = "Thanks. Pretend I did something with the data.";
    sendMessage(
      {
        code: 0,
        message: msg,
      },
    );
  }

  if ("saveToLocalStorage" in data) {
    let msg = "got your local storage data, requesting url....";
    sendMessage({
      message: msg,
    });
  }
  if ("otherAction" in data) {
    let msg = "Hola";
    sendMessage({
      message: msg,
    });
  }
});

const sendMessage = async (msg:any) => {
  try {
    // @ts-ignore
    const allClients = await clients.matchAll({ includeUncontrolled: true });
    return Promise.all(
      allClients.map((client:any) => {
        return client.postMessage(msg);
      })
    );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
