import { NETRUNNER_API_URL } from "./constants";

export async function updateUser(
  userId: string,
  toUpdateValues: any
): Promise<any> {
  try {
    if (!userId) throw new Error("[update-user.ts] userId is required.");
    if (!toUpdateValues)
      throw new Error("[update-user.ts] toUpdateValues is required.");

    const url = NETRUNNER_API_URL;
    const params = {
      action: "UPDATE_USER",
      userId: userId,
      params: {
        updateParams: {
          ...toUpdateValues,
          anotherParam: "lol3293409349",
        },
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const body = await response.text(); // or response.json() if you know the response is JSON

    if (!response.ok) {
      console.error("response", body);
      throw new Error(
        `HTTP error! status: ${response.status}. Response body: ${body}`
      );
    }

    return body;
  } catch (error) {
    console.error(`Error in launchBucketApi:`, error);
    // rethrow the error so it can be caught further up the call stack if necessary
    throw error;
  }
}
