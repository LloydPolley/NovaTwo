"use client";

import classNames from "classnames/bind";
import style from "./FilterBar.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

const FilterBar = ({ filters, searchParams }) => {
  const { f } = searchParams || {};

  return (
    <div className={cx("filters")}>
      {filters?.map((filter) => (
        <Link
          key={filter?.url}
          className={cx(filter.label.toLowerCase() === f && "filters__active")}
          href={filter?.url}
        >
          {filter?.label}
        </Link>
      ))}
    </div>
  );
};

export default FilterBar;
