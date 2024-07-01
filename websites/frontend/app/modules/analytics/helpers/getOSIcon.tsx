import { FaAndroid, FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { MdComputer, MdPhoneIphone } from "react-icons/md";

const iconClass = "relative z-10";

export const getOSIcon = (osName: string) => {
  const os = osName.toLowerCase();

  if (os.includes("ios")) return <MdPhoneIphone className={iconClass} />;
  if (os.includes("android")) return <FaAndroid className={iconClass} />;
  if (os.includes("windows")) return <FaWindows className={iconClass} />;
  if (os.includes("mac")) return <FaApple className={iconClass} />;
  if (os.includes("linux")) return <FaLinux className={iconClass} />;

  return <MdComputer className={iconClass} />;
};
