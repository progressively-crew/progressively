import { Logo } from "./Logo/Logo";

export interface H1LogoProps {
  children: React.ReactNode;
}

export const H1Logo = ({ children }: H1LogoProps) => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center">
      <Logo className="h-10 w-10" aria-hidden />
      <h1
        id="page-title"
        className="text-3xl font-bold text-center tracking-wide dark:text-slate-100"
        style={{
          animationDelay: "300ms",
        }}
      >
        {children}
      </h1>
    </div>
  );
};
