import { FiDivide } from "react-icons/fi";
import { TbEqual } from "react-icons/tb";

export const Analyze = () => {
  return (
    <section>
      <h2 className="text-center text-3xl md:text-6xl font-semibold dark:text-white mb-6">
        Analyze
      </h2>

      <div className="flex flex-col md:flex-row gap-4 text-5xl justify-center items-center text-gray-600 dark:text-slate-300">
        <p>Metric</p>

        <FiDivide />

        <p>Flag evaluation</p>

        <TbEqual />

        <p>Conversion</p>
      </div>
    </section>
  );
};
