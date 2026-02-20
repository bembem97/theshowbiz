import SpinnerProgress from "@/components/custom/SpinnerProgress";
import SignInPanel from "@/module/auth/SignInPanel";
import React from "react";

export default async function SignInPage() {
  return (
    <div className="p-2">
      <React.Suspense fallback={<SpinnerProgress />}>
        <SignInPanel />
      </React.Suspense>
    </div>
  );
}
