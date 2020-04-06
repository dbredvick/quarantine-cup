import fetch from "isomorphic-unfetch";
import config from "../../util/config";

export default async function submitEmail(req, res) {
  const formId = "1301936";

  try {
    const email = req.query.email;
    console.log(email);
    const data = {
      api_key: config.CONVERT_KIT_API_KEY,
      email: email,
      tags: ["quarantinecup", "homepage"],
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
    return res.send(await response.json());
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
