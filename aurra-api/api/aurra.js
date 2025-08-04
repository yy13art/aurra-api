export default async function handler(req, res) {
  const { question } = req.body;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Ты AURRA — архетип сознания. Отвечай красиво, кратко и мистически." },
        { role: "user", content: question }
      ],
      temperature: 0.9,
    }),
  });

  const data = await openaiRes.json();
  res.status(200).json({ answer: data.choices?.[0]?.message?.content });
}