import AuthWidget from "../../components/Forms/AuthWidget";
import { Suspense } from "react";

function SignInScreen() {
  return (
    <div>
      <Suspense>
        <AuthWidget />
      </Suspense>
    </div>
  );
}

export default SignInScreen;
