// pages/api/aurra.js

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    // Предварительный ответ CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { message } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Ты оракул по имени AURRA. Отвечай красиво, глубоко, вдохновляюще, с оттенком магии. Отвечай на русском языке.' },
          { role: 'user', content: message },
        ],
        temperature: 0.9,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const answer = data.choices?.[0]?.message?.content || 'Что-то пошло не так...';
    res.status(200).json({ answer });

  } catch (error) {
    console.error('Ошибка на сервере:',
