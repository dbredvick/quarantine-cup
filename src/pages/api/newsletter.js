import { emailSignUp } from "../../server-utils/email-helper";
export default async function submitEmail(req, res) {
  try {
    const email = req.query.email;
    const formId = "1357061";
    const tags = ["quarantineCup", "homepage", "fridayReminder"];
    const [results, error] = await emailSignUp(email, formId, tags);

    if (error && error.message) {
      return res.status(error.status || 500).end(error.message);
    }

    return res.send(results);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}
