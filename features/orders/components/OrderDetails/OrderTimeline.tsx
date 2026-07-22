"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OrderLog {
  id: string;

  action: string;

  description: string;

  created_at: string;
}

interface Props {
  logs: OrderLog[];
}

export function OrderTimeline({
  logs,
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Order Timeline
        </CardTitle>

      </CardHeader>

      <CardContent>

        {logs.length === 0 ? (

          <p className="text-sm text-muted-foreground">
            No activity found.
          </p>

        ) : (

          <div className="space-y-6">

            {logs.map((log, index) => (

              <div
                key={log.id}
                className="flex gap-4"
              >

                {/* Timeline */}

                <div className="flex flex-col items-center">

                  <div className="h-3 w-3 rounded-full bg-primary" />

                  {index !== logs.length - 1 && (

                    <div className="mt-1 h-full w-px bg-border" />

                  )}

                </div>

                {/* Content */}

                <div className="flex-1 pb-6">

                  <h4 className="font-semibold">

                    {log.action}

                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">

                    {log.description}

                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">

                    {new Date(
                      log.created_at
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </CardContent>

    </Card>

  );

}