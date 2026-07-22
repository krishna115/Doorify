"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Customization {
  id: string;
  title: string;
}

interface Props {
  customizations: Customization[];
}

export function CustomizationCard({
  customizations,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Customizations
        </CardTitle>

      </CardHeader>

      <CardContent>

        {customizations.length === 0 ? (

          <p className="text-sm text-muted-foreground">
            No customizations added.
          </p>

        ) : (

          <ul className="space-y-2">

            {customizations.map((item) => (

              <li
                key={item.id}
                className="rounded-md border p-3"
              >
                {item.title}
              </li>

            ))}

          </ul>

        )}

      </CardContent>

    </Card>
  );
}