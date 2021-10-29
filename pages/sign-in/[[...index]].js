import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div
      className={
        "bg-[#f8f8f8] h-screen h-full w-full overflow-hidden flex items-center justify-center"
      }
    >
      <SignIn path={"/sign-in"} routing={"path"} />
    </div>
  );
};

export default SignInPage;
