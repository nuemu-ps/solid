import { JSX, createSignal, Show } from "solid-js";

const DropDownMenu = ({
  children,
  menu_icon,
}: {
  children: JSX.Element;
  menu_icon: JSX.Element;
}) => {
  const [appearance, setAppearance] = createSignal(false);

  const checkClickOutside = (event: MouseEvent) => {
    setAppearance(false);
  };

  return (
    <div style={{ display: "block" }}>
      <div onClick={() => setAppearance(!appearance())}>{menu_icon}</div>
      <Show when={appearance()}>
        <div
          style={{
            "z-index": 10,
            position: "absolute",
            width: "15vw",
            "background-color": "white",
            "box-shadow": "0px 0px 1px 1px lightgray",
            padding: "5px",
          }}
        >
          {children}
        </div>
        <div
          style={{
            "z-index": 0,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onClick={checkClickOutside}
        />
      </Show>
    </div>
  );
};

export default DropDownMenu;
