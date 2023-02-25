import { For, Accessor } from 'solid-js'

interface Props {
  prevParagraphList: Accessor<string[]>
  thisParagraph: Accessor<string>
}

export default (props: Props) => {
  return (
    <>
      <For each={ props.prevParagraphList() }>
        {(item) => (
          <p id="result" py-3 text-slate leading-relaxed break-words op-50>
            { item }
          </p>
        )}
      </For>
      <p id="result" py-3 text-slate leading-relaxed break-words>
        { props.thisParagraph() }
      </p>
    </>
  )
}