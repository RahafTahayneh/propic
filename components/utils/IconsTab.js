import React, { useEffect, useState } from "react";
import { MenuItem, Select, TextField } from "@material-ui/core";
import { SketchPicker } from "react-color";
import TabWrapper from "./TabWrapper";
import { Btn } from "../Btn";

const IconsTab = ({ name, data, setData }) => {
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState(data.icon.name || "react");

  const [color, setColor] = useState({
    color: data.icon.color || "#46685f",
    opa: 1,
  });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });

    setData({
      ...data,
      icon: {
        ...data.icon,
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

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json"
    )
      .then((r) => r.json())
      .then((data) => {
        setIcons(data);
      });
  }, []);

  return (
    <TabWrapper name={name}>
      <p className="text-xs label">Choose your icon:</p>
      <Select
        value={icon}
        onChange={(e) => {
          setIcon(e.target.value);
          setData({
            ...data,
            icon: {
              ...data.icon,
              name: e.target.value,
            },
          });
        }}
        size="small"
        className="w-full epilogue"
        variant="outlined"
      >
        {icons.map((icon, key) => (
          <MenuItem value={icon.name} key={key} className="epilogue">
            {icon.name}
          </MenuItem>
        ))}
      </Select>
      <p className="text-xs label">Icon size</p>
      <TextField
        label="Icon size"
        variant="outlined"
        type="number"
        size={"small"}
        value={data.icon.fontSize}
        className="!bg-auto epilogue w-full"
        onChange={(e) =>
          setData({
            ...data,
            icon: {
              ...data.icon,
              fontSize: e.target.value,
            },
          })
        }
      />
      <p className="text-xs label">Icon color</p>
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

export default IconsTab;
