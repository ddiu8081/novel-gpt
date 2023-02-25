import type { APIRoute } from 'astro'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: import.meta.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const get: APIRoute = async (context) => {
  const params = context.url.searchParams
  const text = params.get('input') || ''

  const completion = await openai.createImage({
    prompt: 'Cyberpunk style.' + text,
    n: 1,
    size: '256x256',
    // stream: true,
  })
  const response = completion.data.data as any[]
  return new Response(response.length ? response[0].url : '')
}
