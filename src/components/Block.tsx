import { Dynamic } from "solid-js/web";

const Block = ({type, data}: {type: string, data: any}) => {
  const Blocks = import.meta.glob("./*.tsx", { eager: true })
  const Block = Blocks[`./${type}.tsx`] as any

  return <Dynamic component={Block.default} data={data} />
}

export default Block
