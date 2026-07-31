"use client";

import { useEffect } from "react";

import Image from "next/image";

import {
  ImagePlus,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomizationItem } from "../types";



interface Props {

  value: CustomizationItem[];

  onChange: (
    value: CustomizationItem[]
  ) => void;

}

export function CustomizationList({
  value,
  onChange,
}: Props) {

  useEffect(() => {

    return () => {

      value.forEach((item) => {

        if (item.preview) {

          URL.revokeObjectURL(
            item.preview
          );

        }

      });

    };

  }, [value]);

  function addItem() {

    onChange([
      ...value,
      {
        instruction: "",
        image: null,
        preview: "",
      },
    ]);

  }

  function removeItem(
    index: number
  ) {

    const item = value[index];

    if (item.preview) {

      URL.revokeObjectURL(
        item.preview
      );

    }

    onChange(
      value.filter(
        (_, i) => i !== index
      )
    );

  }

  function updateInstruction(
    index: number,
    instruction: string
  ) {

    const list = [...value];

    list[index] = {
      ...list[index],
      instruction,
    };

    onChange(list);

  }

  function updateImage(
    index: number,
    file: File | null
  ) {

    const list = [...value];

    if (list[index].preview) {

      URL.revokeObjectURL(
        list[index].preview
      );

    }

    list[index] = {
      ...list[index],
      image: file,
      preview: file
        ? URL.createObjectURL(file)
        : "",
    };

    onChange(list);

  }

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold">
          Customizations
        </h3>

        <Button
          size="sm"
          onClick={addItem}
        >

          <Plus className="mr-2 h-4 w-4" />

          Add

        </Button>

      </div>

      {value.length === 0 && (

        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">

          No customizations added.

        </div>

      )}

      {value.map((item, index) => (

        <div
          key={index}
          className="rounded-xl border p-4 space-y-4"
        >

          <Input
            placeholder="Enter customization..."
            value={item.instruction}
            onChange={(e) =>
              updateInstruction(
                index,
                e.target.value
              )
            }
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

            <label className="cursor-pointer">

              <input
                hidden
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) =>
                  updateImage(
                    index,
                    e.target.files?.[0] ??
                      null
                  )
                }
              />

              <div className="flex h-28 w-28 items-center justify-center rounded-lg border border-dashed bg-muted hover:bg-muted/70 transition">

                {item.preview ? (

                  <div className="relative h-full w-full">

                    <Image
                      src={item.preview}
                      alt="Customization"
                      fill
                      className="rounded-lg object-cover"
                    />

                  </div>

                ) : (

                  <div className="flex flex-col items-center gap-2 text-muted-foreground">

                    <ImagePlus className="h-7 w-7" />

                    <span className="text-xs text-center">

                      Add Image

                    </span>

                  </div>

                )}

              </div>

            </label>

            <div className="flex flex-1 items-end justify-end">

              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  removeItem(index)
                }
              >

                <Trash2 className="mr-2 h-4 w-4" />

                Remove

              </Button>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}