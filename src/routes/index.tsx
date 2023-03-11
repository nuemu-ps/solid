import { createSignal, For, Show } from "solid-js";
import { Title, useRouteData } from "solid-start";
import { createServerData$, createServerAction$ } from "solid-start/server";
import Block from "~/components/Block";
import blocks from "~/utils/blocks";
import DropDownMenu from "~/components/DropDownMenu";

export const routeData = () => {
  return createServerData$(() =>
    Array(1000)
      .fill({ type: "Text", data: "TextBlock" })
      .map((block, index) => {
        return { type: `${block.type}`, data: `${block.data}-${index}` };
      })
  );
};

export default function Home() {
  const data = useRouteData<typeof routeData>();
  const [array, setArray] = createSignal(data());

  const [, postBlocks] = createServerAction$(async (new_blocks: any) => {
    console.log(new_blocks);
  });

  const [focusing, setFocusing] = createSignal(-1);

  const add = (index: number, initial: string) => {
    const newArray = JSON.parse(JSON.stringify(array()));
    newArray.splice(index + 1, 0, initial);
    setArray(newArray);
    postBlocks(newArray);
  };

  const destroy = (index: number) => {
    const newArray = JSON.parse(JSON.stringify(array()));
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const onDragStart = (event: DragEvent) => {
    console.log(event);
  };

  return (
    <main>
      <Title>Main</Title>
      <div style={{ display: "flex", position: "relative" }}>
        <div style={{ width: "10%" }} onMouseOver={() => setFocusing(-1)} />
        <div style={{ width: "80%" }}>
          <For each={array()}>
            {(block, index) => (
              <div class="block-wrapper">
                <Show when={index() === focusing()}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      width: "10%",
                      display: "flex",
                      "justify-content": "right",
                    }}
                  >
                    <DropDownMenu menu_icon={<img src="/icons/plus.svg" />}>
                      <For each={blocks}>
                        {(block) => (
                          <div onClick={() => add(index(), block.initial)}>
                            <img src={block.icon} />
                            {block.type}
                          </div>
                        )}
                      </For>
                    </DropDownMenu>
                    <DropDownMenu
                      menu_icon={
                        <img
                          src="/icons/grid.svg"
                          style={{
                            "margin-left": "5px",
                            "margin-right": "5px",
                          }}
                          draggable={true}
                          onDrag={(event) => onDragStart(event)}
                        />
                      }
                    >
                      <div onClick={() => destroy(index())}>
                        <img src="/icons/trash.svg" />
                        Delete
                      </div>
                      <div>
                        <img src="/icons/change.svg" />
                        Change
                      </div>
                    </DropDownMenu>
                  </div>
                </Show>
                <div onMouseOver={() => setFocusing(index())}>
                  {Block(block)}
                </div>
              </div>
            )}
          </For>
        </div>
        <div style={{ width: "10%" }} onMouseOver={() => setFocusing(-1)} />
      </div>
    </main>
  );
}
