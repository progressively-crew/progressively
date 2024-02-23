import { Tabs } from "@radix-ui/react-tabs";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineAttractions } from "react-icons/md";
import { PiSquareFill } from "react-icons/pi";
import { IoMdLink } from "react-icons/io";
import { SiWindows95 } from "react-icons/si";
import { CgBrowser } from "react-icons/cg";
import { BiStats } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa6";
import { IoMdApps } from "react-icons/io";
import { FaCog } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdSmartphone } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { IoMdFunnel } from "react-icons/io";

import { Tab, TabList, TabPanel } from "../components/Tabs";
import { Browser } from "../components/Browser";
import ffSrc from "./assets/abovefold/ff.png";
import catchySrc from "./assets/catchy/catchy.png";
import funnelSrc from "./assets/catchy/funnels.png";

export interface FeatureTabsProps {
  codes: Array<string>;
}

const Box = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-8 w-8 rounded-lg bg-slate-200 flex flex-row items-center justify-center">
      {children}
    </div>
  );
};

export const FeatureTabs = ({ codes }: FeatureTabsProps) => {
  const titleClass = "font-bold text-2xl";
  const textClass = "text-slate-600";

  const liClass = `${textClass} flex flex-row items-center gap-2`;
  const gridClass =
    "flex flex-col md:grid gap-4 md:grid-cols-2 md:gap-8 md:items-center";

  return (
    <Tabs defaultValue="first">
      <TabList>
        <Tab value="first" icon={<IoToggle />}>
          Feature flags
        </Tab>
        <Tab value="second" icon={<BiStats />}>
          Quantitative analytics
        </Tab>
        <Tab value="third" icon={<IoMdFunnel />}>
          Funnels
        </Tab>
        <Tab value="fourth" disabled>
          Qualitative analytics
        </Tab>
        <Tab value="fifth" disabled>
          Screen recording
        </Tab>
      </TabList>

      <TabPanel value="first">
        <div className={gridClass}>
          <div className="flex flex-col gap-4">
            <h3 className={titleClass}>Feature flags</h3>

            <p className={textClass}>
              Feature flags let you turn features on or off with just a click.
              This means you can release new features whenever you're ready.
              Progressively unlocks even more features:
            </p>

            <ul className="flex flex-col gap-2">
              <li className={liClass}>
                <Box>
                  <IoMdApps />
                </Box>
                Single & multi variants
              </li>
              <li className={liClass}>
                <Box>
                  <LuAlarmClock />
                </Box>
                Schedule rollout
              </li>
              <li className={liClass}>
                <Box>
                  <AiOutlineLineChart />
                </Box>
                Gradual rollout
              </li>
              <li className={liClass}>
                <Box>
                  <MdOutlineAttractions />
                </Box>
                Attribute based targeting
              </li>
              <li className={liClass}>
                <Box>
                  <FaUserShield />
                </Box>
                Anonymous
              </li>
            </ul>
          </div>

          <div>
            <Browser>
              <div className="p-2">
                <img src={ffSrc.src} alt="Woop" />
              </div>
            </Browser>
          </div>
        </div>
      </TabPanel>
      <TabPanel value="second">
        <div className={gridClass}>
          <div className="flex flex-col gap-4">
            <h3 className={titleClass}>Quantitative analytics</h3>

            <p className={textClass}>
              Collect details about the page being looked at, and include extra
              activities to learn more about your audience's actions.
            </p>

            <ul className="flex flex-col gap-2">
              <li className={liClass}>
                <Box>
                  <CgBrowser />
                </Box>
                Page views by browser
              </li>
              <li className={liClass}>
                <Box>
                  <SiWindows95 />
                </Box>
                Page views by OS
              </li>
              <li className={liClass}>
                <Box>
                  <MdSmartphone />
                </Box>
                Page views by viewport
              </li>
              <li className={liClass}>
                <Box>
                  <IoMdLink />
                </Box>
                Page views by referer
              </li>
              <li className={liClass}>
                <Box>
                  <BiStats />
                </Box>
                Unique visitors & bounce rate
              </li>
              <li className={liClass}>
                <Box>
                  <FaUserShield />
                </Box>
                Anonymous
              </li>
            </ul>
          </div>

          <Browser>
            <div className="p-2">
              <img src={catchySrc.src} alt="Woop" />
            </div>
          </Browser>
        </div>
      </TabPanel>
      <TabPanel value="third">
        <div className={gridClass}>
          <div className="flex flex-col gap-4">
            <h3 className={titleClass}>Funnels</h3>

            <p className={textClass}>
              Enhance your conversion insights by combining flag evaluations
              with analytics data, providing you with actionable intelligence to
              boost your customer conversion rates.
            </p>

            <ul className="flex flex-col gap-2">
              <li className={liClass}>
                <Box>
                  <PiSquareFill />
                </Box>
                Works with single variant feature flags
              </li>
              <li className={liClass}>
                <Box>
                  <IoMdApps />
                </Box>
                Works with multi variant feature flags
              </li>
              <li className={liClass}>
                <Box>
                  <CgBrowser />
                </Box>
                Works with page views
              </li>
              <li className={liClass}>
                <Box>
                  <FaCog />
                </Box>
                Works with custom events
              </li>
            </ul>
          </div>

          <Browser>
            <div className="p-2">
              <img src={funnelSrc.src} alt="Woop" />
            </div>
          </Browser>
        </div>
      </TabPanel>
    </Tabs>
  );
};
