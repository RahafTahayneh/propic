import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div
      className={
        "bg-[#f8f8f8] h-screen h-full w-full flex items-center justify-center overflow-hidden"
      }
    >
      <SignUp path={"/sign-up"} routing={"path"} />
    </div>
  );
};

export default SignUpPage;
