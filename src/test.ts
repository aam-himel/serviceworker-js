console.log("api test loading...");

// ------- wokring url generation --------
const getDummyTestUrl = () => {
  fetch(
    "https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test"
  )
    .then((response) => {
      if (response.redirected) {
        return fetch(response.url);
      } else {
        return response;
      }
    })
    .then((response) => {
      return response.text();
    })
    .then((content) => {
      console.log("Content:", content);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// ------  test ------

// const generateUrl = async(): Promise<string> => {
//   return fetch("https://testmongo.bdjobs.com/analyticsengine/api/CloudStorage?fileName=test")
//     .then((response: Response) => {
//       if (response.redirected) {
//         return fetch(response.url);
//       } else {
//         return response;
//       }
//     })
//     .then((response: Response) => {
//       return response.text();
//     })
//     .then((content: string) => {
//       console.log("Content:", content);
//       return content;
//     })
//     .catch((error: Error) => {
//       console.error("Error:", error);
//       throw error; // Re-throw the error to maintain type safety
//     });
// };

generateUrl()
  .then((result: string) => {
    // Use the result here
    console.log("Result:", result);
  })
  .catch((error: Error) => {
    // Handle any errors
    console.error("Error:", error);
  });
