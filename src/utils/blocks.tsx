const blocks = import.meta.glob("~/components/Blocks/*.tsx", {
  eager: true,
}) as any;

export default Object.keys(blocks).map((block_key: string) => {
  const block = blocks[block_key];
  const block_type = block_key.split(/(.*)\/(.+)\.tsx/)[2];
  return { type: block_type, icon: block.icon, initial: block.initial };
});
