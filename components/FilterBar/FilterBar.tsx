"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./FilterBar.module.scss";
import Link from "next/link";

type FiltersProps = {
  name: string;
};

const cx = classNames.bind(style);

const FilterBar = ({ name }: FiltersProps) => {
  // const { t } = searchParams;

  return <div className={cx("filters")}>{name}</div>;
};

export default FilterBar;
