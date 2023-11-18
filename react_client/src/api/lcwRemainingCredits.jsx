// Returns live coin watch remaining credits
const functions = require('firebase-functions');
const apiKey = functions.config().vite.live_coin_watch;
export default async function lcwRemainingCredits() {
  return await fetch(new Request("https://api.livecoinwatch.com/credits"), {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "x-api-key": apiKey,
    }),
  }).then(async (response) => {
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());
    console.log("Remaining Credits: ", data);

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    return data;
  });
}