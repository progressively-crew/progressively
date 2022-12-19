import React, { useId } from "react";

export interface CardProps {
  title: string;
  children: React.ReactNode;
  size?: "M";
  highlighted?: boolean;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
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

export const Card = ({
  title,
  children,
  size = "M",
  top,
  bottom,
}: CardProps) => {
  const id = useId();
  const titleStyles = TitleStyles[size];
  const wrapperStyles = WrapperStyles[size];
  const contentStyles = ContentStyles[size];

  return (
    <article
      aria-labelledby={id}
      className={
        "bg-white rounded-xl px-4 py-16 h-full relative drop-shadow-lg overflow-hidden flex flex-col justify-center " +
        " " +
        wrapperStyles
      }
    >
      {top && <div className="pb-4">{top}</div>}
      <h3 className={"font-bold text-center " + titleStyles} id={id}>
        {title}
      </h3>

      <div className={"text-center pt-2 text-gray-600 " + contentStyles}>
        {children}
      </div>

      {bottom && <div className="pt-4">{bottom}</div>}
    </article>
  );
};
