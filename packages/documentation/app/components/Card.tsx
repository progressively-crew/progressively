import React, { useId } from "react";

export interface CardProps {
  title: string;
  children: React.ReactNode;
  size?: "M";
}

const WrapperStyles = {
  M: "",
};

const TitleStyles = {
  M: "text-3xl",
};

const ContentStyles = {
  M: "text-md",
};

const CardLine = () => (
  <div
    className="h-12 w-[1px] self-center border-r border-gray-500 border-dashed"
    aria-hidden
  />
);

export const Card = ({ title, children, size = "M" }: CardProps) => {
  const id = useId();
  const titleStyles = TitleStyles[size];
  const wrapperStyles = WrapperStyles[size];
  const contentStyles = ContentStyles[size];

  return (
    <div className="flex flex-col">
      <CardLine />
      <article
        aria-labelledby={id}
        className={
          "border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-16 h-full relative flex flex-col justify-center " +
          " " +
          wrapperStyles
        }
      >
        <h3
          className={
            "font-semibold text-center dark:text-slate-100 " + titleStyles
          }
          id={id}
        >
          {title}
        </h3>

        <div
          className={
            "text-center pt-2 text-gray-600 dark:text-slate-200 " +
            contentStyles
          }
        >
          {children}
        </div>
      </article>
      <CardLine />
    </div>
  );
};
