import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@material-ui/core";
import { Btn } from "./Btn";

const ImageArea = ({ children, setChildren }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("flower");
  const [searchValue, setSearchValue] = useState("flower");

  const [page, setPage] = useState(1);

  const loader = useRef(null);

  useEffect(() => {
    const client_id = "SmwpLEIr8MZGDGD3S4Ciy1FkkQ4Sb_7rMeVG3y6IgXg";
    const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${searchValue}&page=${page}&per_page=12`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((json) => setData([...data, ...json.results]))
      .catch((err) => console.error("error:" + err));
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

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
      setSearchValue(query);
      setData([]);
      setPage(1);
    }
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  return (
    <div className="w-full h-auto flex items-center justify-center flex-col p-3">
      <TextField
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => searchImages(e)}
        variant="outlined"
        label="Search Images"
        className="w-full epilogue bg-white m-4"
      />
      <div className="flex items-center justify-center w-full h-auto img-container">
        {data.map((data, key) => {
          return (
            <Btn className="!bg-white !m-1 !p-[5px] !rounded-md" key={key}>
              <img
                src={data.urls.small}
                alt={data.alt_description}
                onClick={() => addImage(data.urls.raw)}
                className="image"
              />
            </Btn>
          );
        })}
      </div>
    </div>
  );
};

export default ImageArea;
