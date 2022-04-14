export const Component = () => {
  const toto = "Hello world";
  const { flags } = useFlags();

  if (flags.a) {
    return <div>A {toto}</div>;
  } else {
    return <div>B</div>;
  }
};
