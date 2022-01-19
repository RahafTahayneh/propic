import { Button } from "@material-ui/core";

export const Btn = ({ children, className, onClick }) => {
  return (
    <Button
      className={`cursor-pointer overflow-hidden !rounded-none !lowercase !m-0 !min-w-0 !min-h-0 ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
