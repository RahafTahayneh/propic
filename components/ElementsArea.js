import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { FiChevronRight } from "react-icons/fi";
import { Btn } from "./Btn";
import Loader from "./Loader";

const ElementsArea = ({ children, setChildren }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchUrl = `https://iconfinder-api-auth.herokuapp.com/v4/icons/search?query=${searchValue}&count=50`;

    setIsLoading(true);

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((json) => {
        setData(json.icons);
        setIsLoading(false);
      })
      .catch((err) => console.error("error:" + err));
  }, [searchValue]);

  useEffect(() => {
    fetch("/elements/elements.json")
      .then((res) => res.json())
      .then((json) => setElements(json))
      .catch((err) => console.error("error:" + err));
  }, []);

  const addImage = (src) => {
    setChildren([
      ...children,
      {
        component: (
          <img src={src} style={{ height: "100%", width: "100%" }} alt="" />
        ),
      },
    ]);
  };

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setSearchValue(e.target.value);
      setData([]);
    }
  };

  const changePack = (value) => {
    setData([]);
    setSearchValue(value);
    setQuery(value);
  };

  return (
    <div className="w-full h-auto flex items-center justify-center flex-col p-3">
      <TextField
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => searchImages(e)}
        variant="outlined"
        label="Search Elements"
        className="bg-white epilogue w-full"
      />
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          {searchValue.replace(/\s/g, "").length ? <Loader /> : null}
        </div>
      )}
      {searchValue.replace(/\s/g, "").length ? (
        <div className="flex items-center justify-center w-full h-auto img-container">
          {data.map((data, key) => {
            return (
              <Btn className="!bg-white !m-1 !p-[5px] !rounded-md" key={key}>
                <img
                  src={
                    data.raster_sizes.slice(-1)[0].formats.slice(-1)[0]
                      .preview_url
                  }
                  alt={data.icon_id}
                  onClick={() =>
                    addImage(
                      data.raster_sizes.slice(-1)[0].formats.slice(-1)[0]
                        .preview_url
                    )
                  }
                  className="image"
                />
              </Btn>
            );
          })}
        </div>
      ) : (
        <div className="mt-2">
          {elements.map((data, key) => (
            <Btn
              className="!bg-white !rounded-md !p-2 !block !m-2 !my-3 button"
              onClick={() => changePack(data.value)}
            >
              <img
                src={`/elements/assets/${data.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}.png`}
                alt={data.name}
              />
              <div className="flex justify-between items-center border-t border-[#ddd] pt-2">
                <h3 className="text-[16px] capitalize font-bold dark:text-[#fafafa]">
                  {data.name}
                </h3>
                <h3 className="text-sm text-[#666] flex items-center capitalize">
                  See more <FiChevronRight />
                </h3>
              </div>
            </Btn>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElementsArea;
