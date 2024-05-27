export const Radio = (props: React.HTMLAttributes<HTMLInputElement>) => {
  const classes =
    "custom-radio appearance-none m-0 w-4 h-4 border border-gray-200 hover:border-gray-400 cursor-pointer rounded-full flex items-center justify-center before:content-[''] before:h-2 before:w-2 before:rounded-full checked:before:h-2 checked:before:w-2 checked:before:bg-indigo-300";

  return <input type="radio" className={classes} {...props} />;
};
