import { NETRUNNER_API_URL } from "./constants";

export async function fetchUserById(userId: string): Promise<any> {
  try {
    if (!userId) {
      throw new Error("[launchBucketApi.ts] userId is required.");
    }
    const url = NETRUNNER_API_URL;
    const params = {
      action: "FETCH_USER",
      userId: userId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const body = await response.json();

    if (!response.ok) {
      console.log("[fetch-user.ts] error response", body);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return body;
  } catch (error) {
    console.log("\n");
    console.log(error);
    console.log("\n");
    console.error(`Error in launchBucketApi: ${error}\n`);
    // rethrow the error so it can be caught further up the call stack if necessary
    throw error;
  }
}
