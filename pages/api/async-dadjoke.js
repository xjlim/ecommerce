import fetch from "node-fetch";

const API_ENDPOINT = "https://icanhazdadjoke.com/";

export default async (req, res) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: { Accept: "application/json" },
    });
    const json = await response.json();
    res.status(200).json(json.joke);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
