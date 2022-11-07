import React from "react";

export interface CardProps {
  title: string;
  children: React.ReactNode;
  size?: "M" | "L";
  highlighted?: boolean;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

const WrapperStyles = {
  M: "",
  L: "flex items-center justify-center flex-col",
};

const TitleStyles = {
  M: "text-3xl",
  L: "text-6xl",
};

const ContentStyles = {
  M: "text-md",
  L: "text-lg",
};

export const Card = ({
  title,
  children,
  size = "M",
  highlighted,
  top,
  bottom,
}: CardProps) => {
  const titleStyles = TitleStyles[size];
  const wrapperStyles = WrapperStyles[size];
  const contentStyles = ContentStyles[size];

  const bgHlgt = highlighted
    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
    : "bg-white";

  const contentHlgt = highlighted ? "text-white" : "text-gray-600";

  return (
    <article
      className={
        "rounded-xl px-4 py-8 h-full relative drop-shadow-xl overflow-hidden " +
        bgHlgt +
        " " +
        wrapperStyles
      }
    >
      {top && <div className="pb-3">{top}</div>}
      <h2 className={"font-bold text-center " + titleStyles}>{title}</h2>

      <div className={"text-center pt-3 " + contentStyles + " " + contentHlgt}>
        {children}
      </div>
      {bottom && <div className="pt-4">{bottom}</div>}
    </article>
  );
};
