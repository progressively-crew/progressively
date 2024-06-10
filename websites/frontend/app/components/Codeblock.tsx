import { ButtonCopy } from "./ButtonCopy";

export interface CodeblockProps {
  html: string;
  rawCode: string;
}

export const Codeblock = ({ html, rawCode }: CodeblockProps) => {
  return (
    <div className="relative bg-white group">
      <div className="hidden absolute top-0 right-0 group-hover:block z-30">
        <ButtonCopy
          size="S"
          toCopyAlternative="the code"
          toCopy={rawCode}
          className="bg-white"
        >
          Copy
        </ButtonCopy>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="text-xs overflow-auto"
      ></div>
    </div>
  );
};
