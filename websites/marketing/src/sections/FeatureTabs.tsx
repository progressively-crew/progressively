import { Tabs } from "@radix-ui/react-tabs";
import { Tab, TabList, TabPanel } from "../components/Tabs";

export const FeatureTabs = () => {
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

      <TabPanel value="first">First panel</TabPanel>
      <TabPanel value="second">Second panel</TabPanel>
      <TabPanel value="third">Third panel</TabPanel>
    </Tabs>
  );
};
