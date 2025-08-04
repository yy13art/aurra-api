export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Пустой запрос' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.MODEL || "gpt-4",
        messages: [
          { role: "system", content: "Ты AURRA — архетип сознания. Отвечай красиво, кратко и мистически." },
          { role: "user", content: prompt }
        ],
        temperature: 0.9
      })
    });

    const data = await response.json();

    if (response.ok) {
      const answer = data.choices[0].message.content.trim();
      return res.status(200).json({ result: answer });
    } else {
      return res.status(500).json({ error: data.error.message || 'Ошибка OpenAI' });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Ошибка сервера: ' + err.message });
  }
}
