import type { APIRoute } from 'astro'

const apiKey = import.meta.env.OPENAI_API_KEY

export const post: APIRoute = async (context) => {
  const body = await context.request.json()
  const text = body.input || ''

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify({
      prompt: 'Cyberpunk style.' + text,
      n: 1,
      size: '256x256',
    }),
  })
  const completion = await response.json()
  const data = completion.data as any[]
  const imgUrl = data.length ? data[0].url : ''
  return new Response(JSON.stringify({ imgUrl }))
}
