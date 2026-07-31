"use client";

import { CustomizationItem } from "../../types";
import {
  CustomizationList,
} from "../CustomizationList";

interface Props {

  value: CustomizationItem[];

  onChange: (
    value: CustomizationItem[]
  ) => void;

}

export function CustomizationSection({
  value,
  onChange,
}: Props) {

  return (

    <div className="space-y-2">

      <CustomizationList
        value={value}
        onChange={onChange}
      />

    </div>

  );

}