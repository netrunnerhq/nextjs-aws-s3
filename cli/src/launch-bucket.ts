import { NETRUNNER_API_URL } from "./constants";

// Data types
interface BucketParams {
  region: string;
  templateName: string;
  serviceName: string;
}

interface LaunchBucketApiParams {
  userId: string;
  bucketParams: BucketParams;
}

// Utility function to check input data
function validateInput(params: LaunchBucketApiParams) {
  if (!params.userId) {
    throw new Error("[launchBucketApi.ts] userId is required.");
  }

  const { region, templateName, serviceName } = params.bucketParams;
  if (!region || !templateName || !serviceName) {
    throw new Error("[launchBucketApi.ts] Invalid bucket parameters.");
  }
}

export async function launchBucketApi(
  params: LaunchBucketApiParams
): Promise<any> {
  try {
    // Validate input data
    validateInput(params);

    const url = NETRUNNER_API_URL;

    // Request parameters
    const requestParams = {
      action: "LAUNCH_NEW_BUCKET",
      userId: params.userId,
      params: params.bucketParams,
    };

    // Send request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestParams),
    });

    // Parse response
    const body = await response.json();
    if (!response.ok) {
      console.error("HTTP response error", body);
      throw new Error(
        `[launch-bucket.ts] HTTP error! status: ${response.status}`
      );
    }

    return body;
  } catch (error) {
    console.error(
      `[launch-bucket.ts] Error in launchBucketApi: ${JSON.stringify(error)}`
    );
    // tslint:disable-next-line: no-throw
    throw new Error(
      `[launch-bucket.ts] cError in launchBucketApi ${JSON.stringify(error)}`
    );
  }
}
