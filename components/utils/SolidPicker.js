import React, { useState } from "react";
import { Btn } from "../Btn";
import { SketchPicker } from "react-color";
import TabWrapper from "./TabWrapper";

const SolidPicker = ({ data, setData }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    color: data.background.color ? data.background.color : "#00ff00",
    opa: 1,
  });

  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });
    setData({
      ...data,
      background: {
        type: "solid",
        color: color.hex,
      },
    });
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div>
      <p className="text-xs label">Choose the background color</p>
      <Btn>
        <div
          className="flex flex-row items-center p-2 w-auto rounded-md border border-[#ddd]"
          onClick={() => setDisplayColorPicker(true)}
        >
          <div
            className="color rounded-md"
            style={{ background: color.color }}
          />
          <h3 className="text-sm uppercase font-semibold mx-2">
            {color.color}
          </h3>
        </div>
      </Btn>
      {displayColorPicker && (
        <div style={popover}>
          <div style={cover} onClick={() => setDisplayColorPicker(false)} />
          <SketchPicker color={color.color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default SolidPicker;
