import AuthWidget from "@/components/Forms/AuthWidget";
import { Suspense } from "react";

function SignInScreen() {
  return (
    <div className="login_page flex items-center justify-center">
      <Suspense>
        <AuthWidget />
      </Suspense>
    </div>
  );
}

export default SignInScreen;
