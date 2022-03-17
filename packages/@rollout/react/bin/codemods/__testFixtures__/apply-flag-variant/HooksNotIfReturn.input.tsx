export const Component = () => {
  const toto = "Hello world";
  const { flags } = useFlags();

  if (!flags.a) {
    return <div>A</div>;
  } else {
    return <div>B {toto}</div>;
  }
};
