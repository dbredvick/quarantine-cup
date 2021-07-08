import fetch from "isomorphic-unfetch";
import config from "../util/config";
import { getTagIds } from "../util/constants";

export const emailSignUp = async (email, formId, tags) => {
  let results = {};
  let error = {};
  try {
    const data = {
      api_key: config.CONVERT_KIT_API_KEY,
      email: email,
      tags: getTagIds(tags),
    };
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log("email-signup", response);
    results = await response.json();

    return [results, error];
  } catch (error) {
    console.error(error);
    return [results, error];
  }
};
