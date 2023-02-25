import { Accessor, Show } from 'solid-js'

interface StreamParagraph {
  content: Accessor<string>
  image: Accessor<string>
}

interface SolidParagraph {
  content: string
  image: string
}

interface Props {
  paragraph?: StreamParagraph
  solidParagraph?: SolidParagraph
}

export default ({ paragraph, solidParagraph }: Props) => {
  return (
    <>
      <p py-3 text-slate leading-relaxed break-words>
        { paragraph ? paragraph.content() : solidParagraph?.content }
      </p>
      <Show when={ paragraph && paragraph.image() }>
        <img src={ paragraph?.image() } h-40 mx-auto my-4 />
      </Show>
      <Show when={ solidParagraph && solidParagraph.image }>
        <img src={ solidParagraph?.image } h-40 mx-auto my-4 />
      </Show>
    </>
  )
}