export interface H1LogoProps {
  children: React.ReactNode;
}

export const H1Logo = ({ children }: H1LogoProps) => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center">
      <h1
        id="page-title"
        className="text-4xl font-bold text-center tracking-wide dark:text-slate-100"
      >
        {children}
      </h1>
    </div>
  );
};
