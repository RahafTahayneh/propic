import { useState } from "react";
import { Tab, Tabs, makeStyles } from "@material-ui/core";
import Link from "next/link";
import { FiTwitter } from "react-icons/fi";
import useComponents from "./hooks";
import { twitterShareLink } from "./constants";
import { Btn } from "./Btn";
import EditArea from "./EditArea";
import ElementsArea from "./ElementsArea";
import ImageArea from "./ImageArea";
import UploadArea from "./UploadArea";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "#276955 !important",
  },
});

const TabItem = ({ tab }) => {
  return (
    <div className="w-[65px] h-[50px] lg:w-[85px] lg:h-[60px] flex flex-col items-center justify-center text-[#111]">
      {tab.icon}
      <h3 className="text-xs font-medium lowercase">{tab.name}</h3>
    </div>
  );
};

const LeftBar = ({ data, setData, children, setChildren }) => {
  const classes = useStyles();
  const { appTabs } = useComponents();
  const [selectedTab, setSelectedTab] = useState("home");

  const onChangeSelectedTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const props = {
    data: data,
    setData: setData,
    children: children,
    setChildren: setChildren,
  };

  return (
    <div
      className="h-full absolute lg:relative xl:relative w-9/12 lg:w-[32.5%] xl:w-[32.5%] flex bg-[#F1F5FB] white-light-shadow transition-05 top-0 left-[-100%] xl:left-0 lg:left-0 z-10"
      id="leftBar"
    >
      <div className="bg-gradient h-full w-[5px] lg:w-[10px] xl:w-[10px]" />
      <div className="h-full bg-[#fff] border-r border-[#564BB330] white-light-shadow py-3 flex flex-col items-center justify-between dark:bg-[#182341]">
        <div className="w-full flex flex-col h-auto items-center justify-center">
          <Link href="/">
            <a>
              <img
                src="/assets/logo-1.png"
                alt="Logo"
                height="60"
                width="60"
                className="m-3 w-[60px] logo"
              />
            </a>
          </Link>
          <Tabs
            value={selectedTab}
            onChange={onChangeSelectedTab}
            orientation="vertical"
            variant="scrollable"
            classes={{
              indicator: classes.indicator,
            }}
          >
            {appTabs.map((tab, key) => (
              <Tab
                label={<TabItem tab={tab} />}
                value={tab.name}
                key={key}
                className="!p-0 !m-0 !min-w-0 !min-h-0"
              />
            ))}
          </Tabs>
        </div>
        <div className="w-[65px] h-[50px] lg:w-[85px] lg:h-[60px] flex flex-col items-center justify-center ">
          <Btn
            href={twitterShareLink}
            onClick={() => window.open(twitterShareLink, "_blank")}
          >
            <div className="w-[70px] h-[60px] rounded-md flex flex-col items-center justify-center twitter-icon">
              <FiTwitter className="text-xl lg:text-xl xl:text-xl mb-1" />
              <h3 className="text-xs font-medium lowercase">Share</h3>
            </div>
          </Btn>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-start flex-col py-3 scroll">
        {selectedTab === "home" && <EditArea data={data} setData={setData} />}
        {selectedTab === "elements" && <ElementsArea {...props} />}
        {selectedTab === "images" && <ImageArea {...props} />}
        {selectedTab === "uploads" && <UploadArea {...props} />}
      </div>
    </div>
  );
};

export default LeftBar;
