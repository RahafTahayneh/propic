import { Button } from "@mui/material";

export const Btn = ({ children, className, onClick, href }) => {
  return (
    <Button
      className={`cursor-pointer ${className} overflow-hidden !rounded-none !lowercase !p-0 !m-0 !min-w-0 !min-h-0`}
      onClick={() => window.open(href, "_blank")}
    >
      {children}
    </Button>
  );
};
