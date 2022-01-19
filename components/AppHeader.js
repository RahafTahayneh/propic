import React from "react";
import { MenuItem, TextField, Menu } from "@material-ui/core";
import { FiDownload, FiMenu, FiShare2 } from "react-icons/fi";
import { Btn } from "./Btn";

const AppHeader = ({
  anchorEl,
  setAnchorEl,
  fileName,
  setFileName,
  showLeftBar,
  getShareImage,
  downloadAsPng,
  downloadAsJpg,
  downloadAsSvg,
}) => {
  return (
    <div className="w-full bg-[#F1F5FB] h-auto relative border-b border-[#276955] py-3 px-3 flex items-center justify-between flex-col lg:flex-row xl:flex-row">
      <div className="flex justify-between w-auto">
        <TextField
          label="File name"
          variant="outlined"
          size="small"
          value={fileName}
          className="bg-white epilogue"
          onChange={(e) => setFileName(e?.target?.value)}
        />
        <Btn onClick={showLeftBar} className="lg:!hidden xl:!hidden">
          <div className="px-2 rounded-md p-[8px] flex items-center justify-center text-[#222]">
            <FiMenu className="text-xl" />
          </div>
        </Btn>
      </div>
      <div className="flex mt-2 lg:mt-0 xl:mt-0 w-auto">
        <Btn className="!mr-[5px] !p-0" onClick={getShareImage}>
          <div className="p-[8px] border border-[#216e5a] rounded-md flex items-center justify-center capitalize">
            <div
              className="bg-[#EFF1FE] flex items-center justify-center rounded-md dark:text-[#fafafa]"
              id="shareContainer"
            >
              <span id="share">Share Image</span>
              <FiShare2 className="text-xl ml-2" />
            </div>
          </div>
        </Btn>
        <Btn onClick={(e) => setAnchorEl(e.currentTarget)}>
          <div className="px-4 p-[8px] bg-app-gradient-to-l rounded-md text-white flex items-center justify-center capitalize">
            Download
            <FiDownload className="text-xl ml-2" />
          </div>
        </Btn>
        <Menu
          keepMounted
          className="menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>
            <div
              onClick={downloadAsPng}
              className="w-full flex items-center justify-between px-3 mb-6"
            >
              <div className="relative">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="font-bold text-[#222]">PNG</h3>
                  <span className="ml-1 mb-1 bg-app-gradient-to-l px-2 ml-2 rounded-md text-white text-xs font-medium">
                    suggested
                  </span>
                </div>
                <p className="text-xs text-[#444]">High quality image</p>
              </div>
              <FiDownload className="text-xl ml-2 text-[#564BB3]" />
            </div>
          </MenuItem>
          <div className="w-[90%] border border-b rounded-md my-4 mb-6 mt-2" />
          <MenuItem>
            <div
              onClick={downloadAsJpg}
              className="w-full flex items-center justify-between px-3 mt-2 mb-1"
            >
              <div className="relative">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="font-bold text-[#222]">JPG</h3>
                </div>
                <p className="text-xs text-[#444]">Low quality image</p>
              </div>
              <FiDownload className="text-xl ml-2 text-[#564BB3]" />
            </div>
          </MenuItem>
          <div className="w-[90%] border border-b rounded-md my-4 mb-6 mt-2" />
          <MenuItem>
            <div
              onClick={downloadAsSvg}
              className="w-full flex items-center justify-between px-3 mt-2 mb-1"
            >
              <div className="relative">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="font-bold text-[#222]">SVG</h3>
                </div>
                <p className="text-xs text-[#444]">Sharp vector graphics</p>
              </div>
              <FiDownload className="text-xl ml-2 text-[#564BB3]" />
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AppHeader;
