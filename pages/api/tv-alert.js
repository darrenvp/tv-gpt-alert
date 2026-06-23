import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      status: "ok",
      message: "TradingView GPT API Running"
    });
  }

  try {
    const data = req.body;

    const prompt = `
你是一位專業股票分析師。

股票代號：${data.symbol}
價格：${data.price}
事件：${data.event}

請用繁體中文回答：

1. 這個訊號代表什麼
2. 關鍵支撐與壓力
3. 操作建議

限制100字內。
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    return res.status(200).json({
      success: true,
      analysis: response.output_text
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
