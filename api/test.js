import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POST only" });
  }

  const { job } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI that rewrites resumes to match job descriptions."
        },
        {
          role: "user",
          content: `Rewrite this resume for the following job description:\n${job}`
        }
      ],
      max_tokens: 300
    });

    const aiText = completion.choices[0].message.content;

    res.status(200).json({ message: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI request failed: " + err.message });
  }
}
