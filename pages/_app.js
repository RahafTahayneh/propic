import "tailwindcss/tailwind.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Router, { useRouter } from "next/router";
import includes from "lodash/includes";
import "../styles/App.css";

const clerkFrontendAPI = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const publicPages = [
  "/",
  "/app",
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <ClerkProvider
      frontendApi={clerkFrontendAPI}
      navigate={(to) => router.push(to)}
    >
      <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
        {includes(publicPages, router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </div>
    </ClerkProvider>
  );
};

export default MyApp;
