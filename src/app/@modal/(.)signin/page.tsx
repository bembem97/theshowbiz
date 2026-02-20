import SignInPanel from "@/module/auth/SignInPanel";
import ModalSignIn from "./Modal";
import SpinnerProgress from "@/components/custom/SpinnerProgress";
import React from "react";

export default async function SignInPage() {
  return (
    <ModalSignIn>
      <React.Suspense fallback={<SpinnerProgress />}>
        <SignInPanel className="max-w-2xl dark:bg-black" />
      </React.Suspense>
    </ModalSignIn>
  );
}
