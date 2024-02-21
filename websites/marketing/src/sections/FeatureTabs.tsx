import { Tabs } from "@radix-ui/react-tabs";
import { Tab, TabList, TabPanel } from "../components/Tabs";
import { Browser } from "../components/Browser";
import ffSrc from "./assets/above-fold/ff.png";
import catchySrc from "./assets/catchy/catchy.png";
import { Code } from "../components/Code";

export interface FeatureTabsProps {
  codes: Array<string>;
}

export const FeatureTabs = ({ codes }: FeatureTabsProps) => {
  const titleClass = "font-bold text-2xl";

  return (
    <Tabs defaultValue="first">
      <TabList>
        <Tab value="first">Feature flags</Tab>
        <Tab value="second">Quantitative analytics</Tab>
        <Tab value="third">Funnels</Tab>
        <Tab value="fourth" disabled>
          Qualitative analytics
        </Tab>
        <Tab value="fifth" disabled>
          Screen recording
        </Tab>
      </TabList>

      <TabPanel value="first">
        <Browser>
          <div className="p-2">Blahblah</div>
        </Browser>
        <Code html={codes[0]} />
      </TabPanel>
      <TabPanel value="second">
        <div className="grid grid-cols-[auto_1fr] gap-8">
          <div className="flex flex-col gap-2">
            <h3 className={titleClass}>As simple as adding a script tag</h3>

            <ol className="list-decimal pl-5 flex flex-col gap-4">
              <li>
                <p className="pb-2 text-slate-700">
                  Add this one on your website
                </p>
                <Code html={codes[1]} />
              </li>
              <li>
                <p className="pb-2 text-slate-700">Enjoy.</p>
              </li>
            </ol>
          </div>

          <Browser>
            <div className="p-2">
              <img src={catchySrc.src} alt="Woop" />
            </div>
          </Browser>
        </div>
      </TabPanel>
      <TabPanel value="third">Third panel</TabPanel>
    </Tabs>
  );
};
