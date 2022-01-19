import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import { FiChevronDown } from "react-icons/fi";

const TabWrapper = ({ children, name }) => {
  return (
    <div className="w-11/12 bg-gradient p-[1px] rounded-[4px] mt-4">
      <div className="w-full bg-[#fff] rounded-[4px]">
        <Accordion
          style={{
            background: "inherit",
          }}
        >
          <AccordionSummary
            expandIcon={<FiChevronDown />}
            style={{
              borderBottom: "1px solid #276955",
              background: "inherit",
            }}
            className="!border-[#ddd]"
          >
            <h1 className="font-bold">{name}</h1>
          </AccordionSummary>
          <AccordionDetails>
            <div className="w-full py-1 mt-2">{children}</div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default TabWrapper;
