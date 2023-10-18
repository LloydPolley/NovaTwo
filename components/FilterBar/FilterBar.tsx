"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./FilterBar.module.scss";
import Link from "next/link";

type FiltersProps = {
  filters: string[];
};

const cx = classNames.bind(style);

const FilterBar = ({ filters, searchParams }: FiltersProps) => {
  const { t } = searchParams;

  return (
    <div className={cx("filters")}>
      {filters?.map((filter) => {
        return (
          <Link
            className={cx(
              "filters__item",
              filter.toLowerCase() === t && "filters__active"
            )}
            href={`?t=${filter.toLowerCase()}`}
          >
            {filter}
          </Link>
        );
      })}
    </div>
  );
};

export default FilterBar;
