export default async function handler(req, res) {
  // CORS заголовки
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // или конкретно: "https://aurra.space"
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Обработка preflight запроса
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Только POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешён" });
  }

  // Тело запроса
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Вопрос не передан" });
  }

  // Основной ответ (тест)
  return res.status(200).json({ answer: `Ты спросил: ${question}` });
}
