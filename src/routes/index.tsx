import { createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import Block from "~/components/Block";

export default function Home() {
  const array = Array(10000).fill({type: "Text", data: "TextBlock"}).map((block, index) => {return {type: `${block.type}`, data: `${block.data}-${index}`}})
  const [focusing, setFocusing] = createSignal(-1)

  return (
    <main>
      <Title>Main</Title>
      <div style={{display: "flex", position: "relative"}}>
        <div style={{width: "10%"}} onMouseOver={() => setFocusing(-1)}/>
        <div style={{width: "80%"}}>
          <For each={array}>
            { (block, index) => (
              <>
                <Show when={index() === focusing()}>
                  <div draggable={true} onDragStart={() => console.log(index())} style={{position: "absolute", left: 0, width: "10%", display: "flex", "justify-content": "right"}}>
                    <img src="/plus.svg" />
                    <img src="/grid.svg" style={{"margin-left": "5px", "margin-right": "5px"}} />
                  </div>
                </Show>
                <div onMouseOver={() => setFocusing(index())}>
                  { Block(block) }
                </div>
              </>
            )} 
          </For>
        </div>
        <div style={{width: "10%"}} />
      </div>
    </main>
  );
}
