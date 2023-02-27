import { createSignal, For, Show } from 'solid-js'
import NovelParagraph from './NovelParagraph'
import Guide from './Guide'
import IconClear from './icons/Clear'

interface Paragraph {
  content: string
  image: string
}

export default () => {
  let inputRef: HTMLInputElement
  const [prevParagraphList, setPrevParagraphList] = createSignal<Paragraph[]>([])
  const [currentParagraph, setCurrentParagraph] = createSignal('')
  const [currentImage, setCurrentImage] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  const allStory = () => prevParagraphList().map((paragraph) => paragraph.content).join('\n')

  const handleButtonClick = async () => {
    const inputValue = inputRef.value
    if (!inputValue) {
      return
    }
    setLoading(true)
    if (window?.umami) umami.trackEvent('para_generate')
    inputRef.value = ''
    setCurrentParagraph(inputValue)

    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        input: allStory() + inputValue,
      }),
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = response.body
    if (!data) {
      throw new Error('No data')
    }
    const reader = data.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      if (value) {
        let text = decoder.decode(value)
        if (text === '\n' && currentParagraph().endsWith('\n')) {
          continue
        }
        setCurrentParagraph(currentParagraph() + text)
      }
      done = readerDone
    }
    if (currentParagraph().length > 100) {
      const imgSrc = await generateImage(currentParagraph())
      setCurrentImage(imgSrc)
    }
    setPrevParagraphList([...prevParagraphList(), {
      content: currentParagraph(),
      image: currentImage(),
    }])
    setCurrentParagraph('')
    setCurrentImage('')
    setLoading(false)
  }

  const generateImage = async (prompts: string) => {
    const imgResponse = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({
        input: prompts,
      }),
    })
    const result = await imgResponse.json()
    const imgSrc = result.imgUrl
    return imgSrc
  }

  const clear = () => {
    inputRef.value = ''
    setPrevParagraphList([])
    setCurrentParagraph('')
    setCurrentImage('')
  }

  return (
    <div my-6>
      { !allStory() && !currentParagraph() && <Guide /> }
      <For each={prevParagraphList()}>
        { (paragraph) => (
          <NovelParagraph solidParagraph={paragraph} />
        )}
      </For>
      <NovelParagraph paragraph={{ content: currentParagraph, image: currentImage }} />
      <Show
        when={!loading()}
        fallback={() => (
          <div class="h-12 my-4 flex items-center justify-center bg-slate bg-op-15 text-slate rounded-sm">
            AI is thinking...
          </div>
        )}
      >
        <div class="my-4 flex items-center gap-2">
          <input
            ref={inputRef!}
            type="text" id="input"
            placeholder="Enter a complete sentence..."
            disabled={loading()}
            onKeyDown={(e) => { e.key === 'Enter' && handleButtonClick() }}
            w-full px-4 h-12
            text-slate rounded-sm
            bg-slate bg-op-15 focus:bg-op-20
            focus:ring-0 focus:outline-none
            placeholder:text-slate-400 placeholder:op-30
          />
          <button
            onClick={handleButtonClick}
            disabled={loading()}
            h-12 px-4 py-2
            bg-slate bg-op-15 hover:bg-op-20
            text-slate rounded-sm
          >
            Continue
          </button>
          <button
            onClick={clear}
            disabled={loading()}
            h-12 px-4 py-2
            bg-slate bg-op-15 hover:bg-op-20
            text-slate rounded-sm
          >
            <IconClear />
          </button>
        </div>
      </Show>
    </div>
  )
}