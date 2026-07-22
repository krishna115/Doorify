"use client";

import { CustomizationList } from "../CustomizationList";

interface Props {
  value: string[];

  onChange: (value: string[]) => void;
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