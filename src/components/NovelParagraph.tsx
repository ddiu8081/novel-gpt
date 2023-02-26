import { Accessor, For, Show } from 'solid-js'

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
  const paragraphArr = () => {
    if (paragraph) {
      return paragraph.content().split('\n')
    } else if (solidParagraph) {
      return solidParagraph.content.split('\n')
    }
  }
  return (
    <>
      <For each={ paragraphArr() }>
        { (line) => <p class="py-3 text-slate leading-relaxed break-words">{ line }</p> }
      </For>
      <Show when={ paragraph && paragraph.image() }>
        <img src={ paragraph?.image() } h="240px" mx-auto my-4 />
      </Show>
      <Show when={ solidParagraph && solidParagraph.image }>
        <img src={ solidParagraph?.image } h="240px" mx-auto my-4 />
      </Show>
    </>
  )
}