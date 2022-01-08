import { FiEdit, FiFolder, FiUploadCloud } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { IoShapesOutline } from "react-icons/io5";

const useComponents = () => {
  const appTabs = [
    {
      name: "home",
      icon: <FiEdit className="text-lg lg:text-xl xl:text-xl mb-1" />,
    },
    {
      name: "elements",
      icon: <IoShapesOutline className="text-lg lg:text-xl xl:text-xl mb-1" />,
    },
    {
      name: "uploads",
      icon: <FiUploadCloud className="text-lg lg:text-xl xl:text-xl mb-1" />,
    },

    {
      name: "images",
      icon: <BiImageAdd className="text-xl lg:text-2xl xl:text-2xl mb-[3px]" />,
    },
    {
      name: "saved",
      icon: <FiFolder className="text-lg lg:text-xl xl:text-xl mb-1" />,
    },
  ];

  return {
    appTabs,
  };
};

export default useComponents;
