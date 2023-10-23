"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./FilterBar.module.scss";
import Link from "next/link";

type FiltersProps = {
  filters: string[];
};

const cx = classNames.bind(style);

const FilterBar = ({ filters }: FiltersProps) => {
  // const { t } = searchParams;

  return <div className={cx("filters")}>Discover</div>;
};

export default FilterBar;
