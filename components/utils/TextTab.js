import React, { useState } from "react";
import { MenuItem, Select, TextField } from "@material-ui/core";
import { SketchPicker } from "react-color";
import TabWrapper from "./TabWrapper";
import { Btn } from "../Btn";

const TextTab = ({ textData, setTextData, name }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const [color, setColor] = useState({
    color: textData.color ? textData.color : "#00ff00",
    opa: 1,
  });

  const weights = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];

  const families = [
    "Poppins",
    "Inter",
    "Roboto",
    "Open-Sans",
    "Montserrat",
    "Raleway",
    "Playfair-Display",
    "Fira-Sans",
  ];

  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });
    setTextData({
      ...textData,
      color: color.hex,
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

  const capitalize = ([first, ...rest]) =>
    `${first.toUpperCase()}${rest.join("")}`;

  return (
    <TabWrapper name={capitalize(name)}>
      <p className="text-xs text-[#666] label">Enter the {name}</p>
      <TextField
        label={capitalize(name)}
        variant="outlined"
        size="small"
        value={textData.text}
        className="w-full epilogue !bg-auto"
        onChange={(e) => setTextData({ ...textData, text: e.target.value })}
      />
      <p className="text-xs text-[#666] label">Font Size</p>
      <TextField
        label="Font Size"
        variant="outlined"
        type="number"
        size="small"
        value={textData.fontSize}
        className="w-full epilogue !bg-auto"
        onChange={(e) => setTextData({ ...textData, fontSize: e.target.value })}
      />
      <p className="text-xs text-[#666] label">Line Height</p>
      <TextField
        label="Line Height"
        variant="outlined"
        type="number"
        size="small"
        value={textData.lineHeight}
        className="w-full epilogue !bg-auto"
        onChange={(e) =>
          setTextData({ ...textData, lineHeight: e.target.value })
        }
      />
      <p className="text-xs text-[#666] label">Font Family</p>
      <Select
        value={textData.fontFamily}
        onChange={(e) =>
          setTextData({ ...textData, fontFamily: e.target.value })
        }
        className={`w-full ${textData.fontFamily}`}
        variant="outlined"
        size="small"
      >
        {families.map((family, key) => (
          <MenuItem key={key} value={family}>
            {" "}
            <span className={family}>{family}</span>{" "}
          </MenuItem>
        ))}
      </Select>
      <p className="text-xs label">Font Weight</p>
      <Select
        value={textData.fontWeight}
        className="w-full epilogue !bg-auto"
        onChange={(e) =>
          setTextData({ ...textData, fontWeight: e.target.value })
        }
        variant="outlined"
        size="small"
      >
        {weights.map((value, key) => (
          <MenuItem key={key} value={value} className="epilogue">
            {value}
          </MenuItem>
        ))}
      </Select>
      <p className="text-xs label">Color</p>
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
    </TabWrapper>
  );
};

export default TextTab;
