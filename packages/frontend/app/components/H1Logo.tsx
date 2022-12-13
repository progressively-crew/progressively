import { LogoWithoutText } from "./Logo/WithoutText";

export interface H1LogoProps {
  children: React.ReactNode;
}

export const H1Logo = ({ children }: H1LogoProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <LogoWithoutText
        className="h-10 w-10 motion-safe:animate-fade-enter-left motion-safe:opacity-0"
        aria-hidden
      />
      <h1
        id="page-title"
        className="text-3xl font-bold text-center tracking-wide motion-safe:animate-fade-enter-left motion-safe:opacity-0 dark:text-slate-100"
        style={{
          animationDelay: "300ms",
        }}
      >
        {children}
      </h1>
    </div>
  );
};
