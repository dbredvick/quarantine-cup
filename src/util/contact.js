// 1) Create a Formspree account: https://formspree.io/create/divjoy
// 2) Create a new form and add its Formspree endpoint below
const endpoint = "https://formspree.io/xeqoygrz";

function submit(data) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
}

export default { submit };
