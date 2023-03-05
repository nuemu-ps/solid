import { JSX, createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import Block from "~/components/Block";

const DropDownMenu = ({ children }: { children: JSX.Element }) => {
  const [appearance, setAppearance] = createSignal(false);

  return (
    <div style={{ display: "block" }}>
      <div onClick={() => setAppearance(!appearance())}>{children}</div>
      <Show when={appearance()}>
        <div
          style={{
            position: "absolute",
            width: "15vw",
            "background-color": "white",
            "box-shadow": "0px 0px 1px 1px lightgray",
            padding: "5px",
          }}
        >
          <div>Sample Menu 1</div>
          <div>Sample Menu 2</div>
          <div>Sample Menu 3</div>
        </div>
      </Show>
    </div>
  );
};

export default function Home() {
  const array = Array(10000)
    .fill({ type: "Text", data: "TextBlock" })
    .map((block, index) => {
      return { type: `${block.type}`, data: `${block.data}-${index}` };
    });
  const [focusing, setFocusing] = createSignal(-1);

  return (
    <main>
      <Title>Main</Title>
      <div style={{ display: "flex", position: "relative" }}>
        <div style={{ width: "10%" }} onMouseOver={() => setFocusing(-1)} />
        <div style={{ width: "80%" }}>
          <For each={array}>
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
                    <DropDownMenu>
                      <img src="/plus.svg" />
                    </DropDownMenu>
                    <DropDownMenu>
                      <img
                        src="/grid.svg"
                        style={{ "margin-left": "5px", "margin-right": "5px" }}
                      />
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
