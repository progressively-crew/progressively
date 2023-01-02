export const Radio = (props: React.HTMLAttributes<HTMLInputElement>) => {
  const classes =
    "appearance-none m-0 w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center before:content-[''] before:h-2 before:w-2 before:rounded-full before:transition-all hover:before:bg-gray-500 checked:hover:before:bg-indigo-500 active:before:scale-150 checked:before:bg-indigo-500 checked:border-indigo-500 checked:before:h-4 checked:before:w-4";

  return <input type="radio" className={classes} {...props} />;
};
