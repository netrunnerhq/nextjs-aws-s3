import { NETRUNNER_API_URL } from "./constants";

export async function updateStatus(
  userId: string,
  status: string
): Promise<any> {
  try {
    if (!userId) throw new Error("[launchBucketApi.ts] userId is required.");
    if (!status) throw new Error("[launchBucketApi.ts] status is required.");

    const url = NETRUNNER_API_URL;
    const params = {
      action: "UPDATE_USER_STATUS",
      userId: userId,
      params: {
        status: status,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const body = await response.text(); // or response.json() if you know the response is JSON
      console.log("response", body);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.log("\n");
    console.log(error);
    console.log("\n");
    console.error(`Error in launchBucketApi: ${error}\n`);
    // rethrow the error so it can be caught further up the call stack if necessary
    throw error;
  }
}
