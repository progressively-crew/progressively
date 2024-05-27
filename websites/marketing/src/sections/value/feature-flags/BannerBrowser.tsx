import type { ReactNode } from "react";
import { Browser } from "../../../components/Browser";

export const SingleVariant = () => (
  <div className="animate-fade-enter-bottom bg-indigo-200 h-4 w-full border-b border-dashed border-indigo-400" />
);
export const AVariant = () => (
  <div className="animate-fade-enter-bottom bg-emerald-200 h-4 w-full border-b border-dashed border-emerald-400" />
);
export const BVariant = () => (
  <div className="animate-fade-enter-bottom bg-orange-200 h-4 w-full border-b border-orange-400" />
);

export const EmptyBanner = () => <div className="h-4" />;

export const BannerBrowser = ({
  banner,
  heading,
}: {
  banner?: ReactNode;
  heading?: ReactNode;
}) => {
  return (
    <Browser size="S" heading={heading}>
      {banner}

      <div className="p-2 flex flex-col gap-2">
        <div className="h-2 rounded-2xl bg-gray-100 h-5 w-full" />
        <div className="h-2 rounded-2xl bg-gray-100 h-5 w-1/2" />
      </div>
    </Browser>
  );
};
