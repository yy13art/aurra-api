export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Метод не разрешён" });
    return;
  }

  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: "Вопрос отсутствует" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Ты AURRA — мистический оракул. Отвечай метафорически, глубоко, интуитивно, мудро."
        },
        {
          role: "user",
          content: question
        }
      ]
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    res.status(200).json({ answer: data.choices[0].message.content.trim() });
  } else {
    res.status(500).json({ error: "Ответ от OpenAI пуст" });
  }
}
