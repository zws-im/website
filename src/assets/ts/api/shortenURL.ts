import { apiURL } from "../constants";

export default async (url: string): Promise<string> => {
  const req = fetch(`${apiURL}/shortenURL?url=${encodeURIComponent(url)}`);

  const response = await req;

  if (response.ok) {
    const json = (await response.json()) || {};
    if (json.error) {
      throw json.error;
    }
    return `https://zws.im/${json.short}`;
  } else {
    throw `${response.status} ${response.statusText} and said ${await response.json()}`;
  }
};
