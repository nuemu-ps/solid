import { createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import Block from "~/components/Block";
import DropDownMenu from "~/components/DropDownMenu";

export default function Home() {
  const [array, setArray] = createSignal(
    Array(1000)
      .fill({ type: "Text", data: "TextBlock" })
      .map((block, index) => {
        return { type: `${block.type}`, data: `${block.data}-${index}` };
      })
  );
  const [focusing, setFocusing] = createSignal(-1);

  const add = (index: number) => {
    const newArray = JSON.parse(JSON.stringify(array()));
    newArray.splice(index + 1, 0, { type: "Text", data: "TextBlock" });
    setArray(newArray);
  };

  const destroy = (index: number) => {
    const newArray = JSON.parse(JSON.stringify(array()));
    newArray.splice(index, 1);
    setArray(newArray);
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
                    <div>
                      <img src="/plus.svg" onClick={() => add(index())} />
                    </div>
                    <DropDownMenu
                      menu_icon={
                        <img
                          src="/grid.svg"
                          style={{
                            "margin-left": "5px",
                            "margin-right": "5px",
                          }}
                        />
                      }
                    >
                      <div onClick={() => destroy(index())}>Delete</div>
                      <div>Sample Menu 2</div>
                      <div>Sample Menu 3</div>
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
