export const Faq = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <details className="border border-slate-200 rounded-lg p-4 max-w-4xl">
      <summary className="font-bold cursor-pointer text-white">{title}</summary>
      <p className="pt-4 text-white">{children}</p>
    </details>
  );
};
