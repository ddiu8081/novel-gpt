import { createSignal, For } from 'solid-js'
import NovelParagraph from './NovelParagraph'

interface Paragraph {
  content: string
  image: string
}

export default () => {
  let inputRef: HTMLInputElement
  const [prevParagraphList, setPrevParagraphList] = createSignal<Paragraph[]>([])
  const [currentParagraph, setCurrentParagraph] = createSignal('')
  const [currentImage, setCurrentImage] = createSignal('')
  const allStory = () => prevParagraphList().map((paragraph) => paragraph.content).join('\n')

  const handleButtonClick = async () => {
    const inputValue = inputRef.value
    setCurrentParagraph(inputValue)

    const response = await fetch(`/api/generate?input=${allStory() + inputValue}`)
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
        const text = decoder.decode(value)
        if (text === '\n' && currentParagraph() !== '') {
          done = true
        } else {
          setCurrentParagraph(currentParagraph() + text)
        }
      }
      done = readerDone
    }
    const imgSrc = await generateImage(currentParagraph())
    setCurrentImage(imgSrc)
    setPrevParagraphList([...prevParagraphList(), {
      content: currentParagraph(),
      image: currentImage(),
    }])
    setCurrentParagraph('')
    setCurrentImage('')
    inputRef.value = ''
  }

  const generateImage = async (prompts: string) => {
    const imgRsponse = await fetch(`/api/image?input=${prompts}`)
    const imgSrc = await imgRsponse.text()
    return imgSrc
  }

  return (
    <>
      <For each={prevParagraphList()}>
        { (paragraph) => (
          <NovelParagraph solidParagraph={paragraph} />
        )}
      </For>
      <NovelParagraph paragraph={{ content: currentParagraph, image: currentImage }} />
      <div class="flex items-center gap-2">
        <input
          ref={inputRef!}
          type="text" id="input"
          w-full my-4 px-3 h-12
          text-xl text-slate
          border="~ white/20" bg="white/2" ring-0
          focus="ring-0 outline-none"
        />
        <button
          onClick={handleButtonClick}
          h-12 px-4 py-2 bg="white op-2 hover"
          border="~ white/20" text-slate
        >
          Submit
        </button>
      </div>
    </>
  )
}