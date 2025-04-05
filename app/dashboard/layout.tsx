import Navigation from "@/components/LayoutComps/Navigation";
import NavContent from "@/components/LayoutComps/Navigation/NavContent";

import Wrapper from "@/components/LayoutComps/Wrapper";
import { Suspense } from "react";
import Header from "@/components/Header/Header";

export default function RootLayout(props) {
  const { children } = props;

  return (
    <Suspense>
      <Navigation />
      <div className={"side-bar"}>
        <NavContent />
        <Wrapper>{children}</Wrapper>
      </div>
    </Suspense>
  );
}
