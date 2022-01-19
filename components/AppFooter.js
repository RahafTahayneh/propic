import React, { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { Btn } from "./Btn";

const AppFooter = () => {
  const [starCount, setStarCount] = useState(1);

  const fetchStarCount = () => {
    fetch("https://api.github.com/repos/RahafTahayneh/propic")
      .then((res) => res.json())
      .then((json) => {
        setStarCount(json.stargazers_count || 73);
      });
  };

  useEffect(() => {
    fetchStarCount();
  }, []);

  return (
    <div className="w-full flex items-center justify-between absolute left-0 bottom-0 px-3">
      <h1 className="text-[16px] font-normal">
        {`${`Made By`} `}
        <a
          href="/"
          className="ml-1 font-bold text-gradient bg-app-gradient-to-l border-b-2 border-[#ae64db]"
        >
          Rahaf Tahayneh
        </a>
      </h1>
      <Btn
        onClick={() =>
          window.open("https://github.com/RahafTahayneh/propic", "_blank")
        }
      >
        <h1 className="text-[16px] font-normal dark:text-[#fafafa] flex items-center">
          <FiGithub className="text-xl" />
          <a
            href="/"
            className="ml-1 font-bold text-gradient bg-app-gradient-to-l border-[#ae64db] capitalize px-3"
          >
            {starCount} Stars
          </a>
        </h1>
      </Btn>
    </div>
  );
};

export default AppFooter;
