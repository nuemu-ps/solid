import { JSX, createSignal, Show } from "solid-js";

const DropDownMenu = ({
  children,
  menu_icon,
}: {
  children: JSX.Element;
  menu_icon: JSX.Element;
}) => {
  const [appearance, setAppearance] = createSignal(false);

  return (
    <div style={{ display: "block" }}>
      <div onClick={() => setAppearance(!appearance())}>{menu_icon}</div>
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
          {children}
        </div>
      </Show>
    </div>
  );
};

export default DropDownMenu;
