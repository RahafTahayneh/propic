import React, { useState } from "react";
import { Btn } from "../Btn";
import { SketchPicker } from "react-color";
import CircularSlider from "@fseehawer/react-circular-slider";

const GradientPicket = ({ data, setData }) => {
  const [displayColorPickers, setDisplayColorPickers] = useState({
    colorPicker1: false,
    colorPicker2: false,
  });

  const [colors, setColors] = useState({
    color1: data.background.color1 ? data.background.color1 : "#276955",
    color2: data.background.color2 ? data.background.color2 : "#6ba794",
  });

  const [direction, setDirection] = useState(
    data.background.direction ? data.background.direction : 0
  );

  const handleColorChange = (color, colorNo) => {
    if (colorNo === "color1") {
      setColors({
        ...colors,
        color1: color.hex,
      });
    } else {
      setColors({
        ...colors,
        color2: color.hex,
      });
    }
    setData({
      ...data,
      background: {
        type: "gradient",
        color1: colors.color1,
        color2: colors.color2,
        direction: direction,
      },
    });
  };

  const popover = {
    position: "absolute",
    zIndex: "9999",
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
          onClick={() =>
            setDisplayColorPickers({
              ...displayColorPickers,
              colorPicker1: true,
            })
          }
        >
          <div
            className="color rounded-md"
            style={{ background: colors.color1 }}
          />
          <h3 className="text-sm uppercase font-semibold mx-2">
            {colors.color1}
          </h3>
        </div>
      </Btn>
      {displayColorPickers.colorPicker1 && (
        <div style={popover}>
          <div
            style={cover}
            onClick={() =>
              setDisplayColorPickers({
                ...displayColorPickers,
                colorPicker1: false,
              })
            }
          />
          <SketchPicker
            color={colors.color1}
            onChange={(color) => handleColorChange(color, "color1")}
          />
        </div>
      )}
      <Btn className="">
        <div
          className="flex flex-row items-center p-2 w-auto rounded-md border border-[#ddd]"
          onClick={() =>
            setDisplayColorPickers({
              ...displayColorPickers,
              colorPicker2: true,
            })
          }
        >
          <div
            className="color rounded-md"
            style={{ background: colors.color2 }}
          />
          <h3 className="text-sm uppercase font-semibold mx-2">
            {colors.color2}
          </h3>
        </div>
      </Btn>
      {displayColorPickers.colorPicker2 && (
        <div style={popover}>
          <div
            style={cover}
            onClick={() =>
              setDisplayColorPickers({
                ...displayColorPickers,
                colorPicker2: false,
              })
            }
          />
          <SketchPicker
            color={colors.color2}
            onChange={(color) => handleColorChange(color, "color2")}
          />
        </div>
      )}
      <p className="text-sm label">Direction:</p>
      <div className="circularPicker">
        <CircularSlider
          width={90}
          valueFontSize="20px"
          labelFontSize="9px"
          verticalOffset="0em"
          onChange={(angle) => {
            setDirection(angle);
            setData({
              ...data,
              background: {
                type: "gradient",
                color1: colors.color1,
                color2: colors.color2,
                direction: direction,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default GradientPicket;
