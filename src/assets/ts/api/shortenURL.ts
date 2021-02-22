import { apiURL } from "../constants";

export default async (url: string): Promise<string> => {
  const req = fetch(apiURL, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "content-type": "application/json" },
  });

  const response = await req;

  if (response.ok) {
    const json: { short: string } = await response.json();

    return `https://zws.im/${json.short}`;
  } else {
    const json = await response.json();

    console.error(json);

    throw `${response.status} and said ${JSON.stringify(json)}`;
  }
};
