import { Configuration, OpenAIApi } from "openai";

interface ReqBody {
  title?: string,
  description?: string,
  keywords?: string,
  body?: string,
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const categories = ["旅行", "交通", "法律", "不動産", "通信", "政府と政治", "人", "美容", "日用品", "食品", "飲料", "嗜好品", "住まい", "外食", "アパレル", "イベント", "ライフイベント", "ギャンブル", "自動車", "バイク", "仕事", "健康", "学習", "ペット", "ファイナンス", "電化製品", "マーケティング", "スポーツ", "文化とエンターテイメント", "その他",]

const extract = (response:string) => {
  const res = response.includes("文化") ? "文化とエンターテイメント" : response
  return res;
}

const promptMessages = (reqBody: ReqBody) => {
  const { title, description, keywords, body } = reqBody;
  return `
      # 指示
      下記のサイトを分類します。
      必ず「候補の中から」「1つだけ」選んでください。
      名前のみ回答してください。
      # 候補

      ${categories.join(", ")}

      # サイト
      title: ${title}
      description: ${description}
      keywords: ${keywords}
      body: ${String(body).substring(0, 1000)}
`}

export default defineEventHandler(async (event) => {
  if (!configuration.apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Open AI API Key does not configured.',
    })
  }

  const body = await readBody(event);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      messages:[
        {role: "user", content: promptMessages(body)}
      ]
    })
    const category = extract(String(completion.data.choices[0].message?.content))
    return { category}
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'URL の検証に失敗しました。',
    })
  }

})
