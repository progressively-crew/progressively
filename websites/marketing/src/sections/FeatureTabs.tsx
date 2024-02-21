import { Tabs } from "@radix-ui/react-tabs";
import { Tab, TabList, TabPanel } from "../components/Tabs";
import { Browser } from "../components/Browser";

export interface FeatureTabsProps {
  codes: Array<string>;
}

export const FeatureTabs = ({ codes }: FeatureTabsProps) => {
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
          <div className="p-8">Blahblah</div>
          <div
            dangerouslySetInnerHTML={{ __html: codes[0]! }}
            className="[&>*]:p-8"
          ></div>
        </Browser>
      </TabPanel>
      <TabPanel value="second">
        <Browser>
          <div className="p-8">fozjfozajfozaj</div>
          <div
            dangerouslySetInnerHTML={{ __html: codes[0]! }}
            className="[&>*]:p-8"
          ></div>
        </Browser>
      </TabPanel>
      <TabPanel value="third">Third panel</TabPanel>
    </Tabs>
  );
};
