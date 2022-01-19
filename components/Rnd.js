import React, { useState } from "react";

import { Rnd } from "react-rnd";

const Component = ({ children, width, x, y }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const onDragStart = () => {
    setIsEditing(true);
  };
  const onDragStop = () => {
    setIsEditing(false);
  };

  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    display: isHiding ? "none" : "block",
  };

  return (
    <Rnd
      style={style}
      default={{ x: x || 0, y: y || 0, width: width || 320 }}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResizeStart={onDragStart}
      onResizeStop={onDragStop}
      className="resizerComp"
    >
      {children}
      <div
        className={`w-full h-full absolute top-0 left-0 border-[3px] border-[#4286f4] resizer ${
          !isEditing && "hidden"
        }`}
      >
        <div
          className="absolute right-0 top-[-50px] flex items-center justify-center p-2 px-3 z-10 rounded-md bg-red-500 hover:bg-red-700 cursor-pointer text-white"
          onClick={() => setIsHiding(true)}
        >
          Delete
        </div>
      </div>
    </Rnd>
  );
};

export default Component;
