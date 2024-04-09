import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../api/getDjs";
import { cookies } from "next/headers";
import Hero from "../../components/Hero";
import Wrapper from "../../components/Wrapper";
import RadioMenu from "../../components/RadioMenu";
import FilterBar from "../../components/FilterBar";

const cx = classNames.bind(styles);

export default async function RootLayout({ children, params }) {
  const user = await getDj(params?.id);

  return (
    <div className={cx("artist")}>
      <Hero title={user?.displayName} img={user?.profile} user={user} />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
