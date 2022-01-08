import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { FiArrowRight } from "react-icons/fi";

const Header = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center p-3 pr-[2rem] border-b border-[#216e5a] rounded-md">
      <div className="flex items-center">
        <Link href="/">
          <a className="text-4xl font-bold ml-2 text-gradient bg-app-gradient-to-l">
            ProPic
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <SignedOut>
          <Link href="/sign-in">
            <a>
              <button className="inline-flex items-center h-10 px-5 text-gray-50 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">
                <span>Sign in</span>
                <FiArrowRight className="text-xl ml-2" />
              </button>
            </a>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
