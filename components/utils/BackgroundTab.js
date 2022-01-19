import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import TabWrapper from "./TabWrapper";
import SolidPicker from "./SolidPicker";
import PatternPicker from "./PatternPicker";
import GradientPicker from "./GradientPicker";

const BackgroundTab = ({ data, setData, name }) => {
  const [bgValue, setBgValue] = useState(data.background.type);

  const backgroundTabs = ["solid", "gradient", "pattern"];

  const BgTabItem = ({ tab }) => {
    return (
      <div className="flex flex-col items-center justify-center text-[#111] border border-[#ddd] tab">
        <h3 className="text-sm font-medium lowercase ">{tab}</h3>
      </div>
    );
  };

  return (
    <TabWrapper name={name}>
      <Tabs
        value={bgValue}
        onChange={(e, value) => setBgValue(value)}
        className="!p-0 !m-0 !min-w-0 !min-h-0"
      >
        {backgroundTabs.map((tab, key) => (
          <Tab
            label={<BgTabItem tab={tab} />}
            value={tab}
            key={key}
            className="!p-0 !m-0 !min-w-0 !min-h-0"
          />
        ))}
      </Tabs>
      <div className="mt-5">
        {bgValue === "solid" && <SolidPicker data={data} setData={setData} />}
        {bgValue === "pattern" && (
          <PatternPicker data={data} setData={setData} />
        )}
        {bgValue === "gradient" && (
          <GradientPicker data={data} setData={setData} />
        )}
      </div>
    </TabWrapper>
  );
};

export default BackgroundTab;
