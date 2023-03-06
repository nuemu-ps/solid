const TextBlock = (data: any) => {
  return (
    <div contentEditable={true} style={{ outline: "none" }}>
      {data.data}
    </div>
  );
};

export default TextBlock;

export const initial = {
  type: "Text",
  data: "TextBlock",
};
