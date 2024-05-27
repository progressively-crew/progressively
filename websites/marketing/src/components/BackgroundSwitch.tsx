import { useEffect, useState, type ReactNode } from "react";

export interface BackgroundSwitchProps {
  children: ReactNode;
}

const sectionToClass = {
  root: "bg-white",
  "feature-flags-section": "bg-indigo-50",
  "quantitative-analytics-section": "bg-pink-50",
  "funnels-section": "bg-emerald-50",
  "more-to-com-section": "bg-amber-50",
};

export const BackgroundSwitch = ({ children }: BackgroundSwitchProps) => {
  const [section, setSection] = useState<keyof typeof sectionToClass>("root");

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSection(entry.target.id as keyof typeof sectionToClass);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });
    observer.observe(document.getElementById("feature-flags-section")!);
    observer.observe(
      document.getElementById("quantitative-analytics-section")!
    );
    observer.observe(document.getElementById("funnels-section")!);
    observer.observe(document.getElementById("more-to-com-section")!);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`transition-all duration-500 ${sectionToClass[section]}`}>
      {children}
    </div>
  );
};
