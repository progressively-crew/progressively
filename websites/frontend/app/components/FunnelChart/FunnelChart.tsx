// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/funnel
import { ResponsiveFunnel } from "@nivo/funnel";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const FunnelChart = ({ data }: any) => (
  <div className="h-[200px]">
    <ResponsiveFunnel
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      direction="horizontal"
      shapeBlending={0}
      borderWidth={20}
      borderColor={{ from: "color", modifiers: [] }}
      borderOpacity={0.5}
      colors={(datum) => (datum as any).color}
      labelColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      beforeSeparatorLength={20}
      beforeSeparatorOffset={10}
      afterSeparatorLength={20}
      afterSeparatorOffset={10}
      currentPartSizeExtension={10}
      currentBorderWidth={40}
      motionConfig="wobbly"
      theme={{
        labels: {
          text: {
            fontSize: 16,
            fontWeight: "bold",
          },
        },
      }}
    />
  </div>
);
