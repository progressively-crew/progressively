export const Radio = (props: React.HTMLAttributes<HTMLInputElement>) => {
  const classes =
    "custom-radio appearance-none m-0 w-4 h-4 border border-gray-200 rounded-full flex items-center justify-center before:content-[''] before:h-2 before:w-2 before:rounded-full before:transition-all hover:before:bg-gray-300 checked:before:h-2 checked:before:w-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  return <input type="radio" className={classes} {...props} />;
};
