import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiGithub, FiZap } from "react-icons/fi";
import { Header } from "../components";

const Index = () => {
  const [starCount, setStarCount] = useState(112);
  const fetchStarCount = () => {
    fetch("https://api.github.com/repos/RahafTahayneh/propic")
      .then((res) => res.json())
      .then((json) => {
        setStarCount(json.stargazers_count);
      });
  };

  useEffect(() => {
    fetchStarCount();
  }, []);

  return (
    <div className="h-screen h-full w-full overflow-hidden flex justify-center items-center bg-[#f8f8f8]">
      <div className="h-[95%] w-[95%] rounded-md home-bg border border-[#216e5a]">
        <div className="w-full">
          <Header />
        </div>
        <div className="h-auto xl:h-[calc(100%-50px)] lg:h-[calc(100%-50px)] flex flex-col lg:flex-row xl:flex-row items-center justify-between py-4">
          <div className="w-full lg:w-6/12 xl:w-6/12 h-full flex flex-col items-start justify-center pl-8">
            <h1 className="font-bold text-2xl lg:text-[2.55em] xl:text-[2.55em] lg:leading-[1.2em] xl:leading-[1.2em] text-[#14142B]">
              A powerful cover image designer for you
            </h1>
            <p className="text-[#6E7191] mt-4 text-xs lg:text-base xl:text-base ">
              Enjoy creating cover image like never before, get started in
              seconds 🎉
            </p>
            <div className="flex mt-3">
              <Link href="/app">
                <a>
                  <button className="inline-flex items-center h-10 px-8 py-6 text-gray-50 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800 group-hover:text-white">
                    <span>Try now</span>
                    <FiZap className="text-xl ml-2" />
                  </button>
                </a>
              </Link>
              <div className="ml-3">
                <a
                  href="https://github.com/RahafTahayneh/propic"
                  target="_blank"
                >
                  <button className="inline-flex items-center h-10 px-8 py-6 text-gray-50 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800 group-hover:text-white">
                    <span>{`${starCount || 73} Stars`}</span>
                    <FiGithub className="text-xl ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-6 lg:px-0 xl:px-0 xl:w-6/12 lg:w-6/12 h-auto xl:h-full lg:h-full py-3 flex flex-col items-center justify-center">
            <img
              src="/assets/illustarion.svg"
              alt=""
              className="w-[500px] rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
