import type { APIRoute } from 'astro'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: import.meta.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const get: APIRoute = async (context) => {
  const params = context.url.searchParams
  const text = params.get('input')

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(text),
    temperature: 0.6,
    max_tokens: 300,
    // stream: true,
  })
  const response = completion.data
  return new Response(JSON.stringify(response))
}

const generatePrompt = (text: string) => {
  return `续写一篇小说。
  
  ${ text }。`
}