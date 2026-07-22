"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  value: string[];

  onChange: (value: string[]) => void;
}

export function CustomizationList({
  value,
  onChange,
}: Props) {

  function addItem() {
    onChange([
      ...value,
      "",
    ]);
  }

  function removeItem(index: number) {
    onChange(
      value.filter(
        (_, i) => i !== index
      )
    );
  }

  function updateItem(
    index: number,
    text: string
  ) {
    const list = [...value];

    list[index] = text;

    onChange(list);
  }

  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <h3 className="font-medium">
          Customizations
        </h3>

        <Button
          size="sm"
          onClick={addItem}
        >
          Add
        </Button>

      </div>

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No customization added.
        </p>
      )}

      {value.map((item, index) => (

        <div
          key={index}
          className="flex gap-2"
        >

          <Input
            placeholder="Enter instruction..."
            value={item}
            onChange={(e) =>
              updateItem(
                index,
                e.target.value
              )
            }
          />

          <Button
            variant="destructive"
            onClick={() =>
              removeItem(index)
            }
          >
            Remove
          </Button>

        </div>

      ))}

    </div>
  );
}