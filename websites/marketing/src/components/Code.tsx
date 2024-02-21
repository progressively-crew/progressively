export interface CodeProps {
  html: string;
}
export const Code = ({ html }: CodeProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&>*]:p-4 text-xs [&>*]:overflow-hidden [&>*]:rounded-lg"
    />
  );
};
