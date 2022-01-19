import React, { useEffect, useState } from "react";

import TextTab from "./utils/TextTab";
import IconsTab from "./utils/IconsTab";
import BackgroundTab from "./utils/BackgroundTab";

const EditArea = ({ data, setData }) => {
  const [title, setTitle] = useState({
    fontSize: data.title.fontSize,
    fontFamily: data.title.fontFamily,
    color: data.title.color,
    fontWeight: data.title.fontWeight,
    text: data.title.text,
    lineHeight: data.title.lineHeight,
  });

  const [tagline, setTagline] = useState({
    fontSize: data.tagline.fontSize,
    fontFamily: data.tagline.fontFamily,
    color: data.tagline.color,
    fontWeight: data.tagline.fontWeight,
    text: data.tagline.text,
    lineHeight: data.tagline.lineHeight,
  });

  useEffect(() => {
    setData({
      ...data,
      title: title,
      tagline: tagline,
    });
  }, [title, tagline]);

  return (
    <>
      <TextTab textData={title} setTextData={setTitle} name="title" />
      <TextTab textData={tagline} setTextData={setTagline} name="tagline" />
      <IconsTab data={data} setData={setData} name="Icon" />
      <BackgroundTab name="Background" data={data} setData={setData} />
    </>
  );
};

export default EditArea;
