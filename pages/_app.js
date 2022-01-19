import "tailwindcss/tailwind.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import NProgress from "nprogress";
import Router, { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import includes from "lodash/includes";
import "../styles/App.css";
import { MetaTags } from "../components";

const clerkFrontendAPI = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const publicPages = [
  "/",
  "/app",
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  });

  return (
    <ClerkProvider
      frontendApi={clerkFrontendAPI}
      navigate={(to) => router.push(to)}
    >
      <div className={`w-full h-full overflow-x-hidden overflow-y-auto`}>
        <MetaTags />
        <Toaster position="bottom-right" reverseOrder={false} />
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
