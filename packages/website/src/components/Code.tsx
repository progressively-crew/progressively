export interface Props {
  html: string;
}

export const Code = ({ html }: Props) => {
  const bgColor = "bg-slate-800 text-slate-100 border-slate-700";
  const codeClass = `leading-relaxed h-full block text-[11px] overflow-x-scroll md:overflow-hidden ${bgColor}`;
  const preClass = `overflow-hidden md:overflow-visible px-4 rounded-lg border ${bgColor}`;

  return (
    <pre className={preClass}>
      <code
        dangerouslySetInnerHTML={{ __html: html }}
        className={`${codeClass}`}
      />
    </pre>
  );
};
