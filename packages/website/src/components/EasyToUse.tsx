import { useEffect } from "react";

export interface Props {
  clientComponent: string;
  alternate: boolean;
}

export const EasyToUse = ({ clientComponent, alternate }: Props) => {
  const bgColor = alternate
    ? "bg-slate-100 border-slate-200"
    : "bg-slate-800 text-slate-100 border-slate-700";

  const codeClass = `leading-relaxed h-full block text-[11px] overflow-x-scroll md:overflow-hidden ${bgColor}`;
  const preClass = `h-[240px] overflow-hidden md:overflow-visible px-4 rounded-lg border ${bgColor}`;

  useEffect(() => {
    const sheet = document.createElement("link");
    sheet.rel = "stylesheet";
    sheet.href = alternate ? "/github.css" : "/github-dark.css";

    document.head.appendChild(sheet);

    return () => {
      return sheet.remove();
    };
  }, [alternate]);

  return (
    <pre className={preClass}>
      <code
        dangerouslySetInnerHTML={{ __html: clientComponent }}
        className={`${codeClass}`}
      />
    </pre>
  );
};
