import { HTMLAttributes } from "react";

export const GlowyLink = (props: HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <div className="relative inline-flex group">
      <div className="group-hover:scale-110 absolute duration-200 transition-all opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg animate-tilt"></div>

      <a
        {...props}
        className="relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      ></a>
    </div>
  );
};
