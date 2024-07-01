import { CgBrowser } from "react-icons/cg";
import { FaChrome, FaEdge, FaFirefox, FaOpera, FaSafari } from "react-icons/fa";
import { SiBrave } from "react-icons/si";

const iconClass = "relative z-10";

export const getBrowserIcon = (browserName: string) => {
  const browser = browserName.toLowerCase();

  if (browser.includes("edge")) return <FaEdge className={iconClass} />;
  if (browser.includes("safari")) return <FaSafari className={iconClass} />;
  if (browser.includes("firefox")) return <FaFirefox className={iconClass} />;
  if (browser.includes("brave")) return <SiBrave className={iconClass} />;
  if (browser.includes("opera")) return <FaOpera className={iconClass} />;
  if (browser.includes("chrome")) return <FaChrome className={iconClass} />;

  return <CgBrowser className={iconClass} />;
};
