"use client";

import { OrderLog } from "..";

interface Props {
  logs: OrderLog[];
}

export function OrderTimeline({
  logs,
}: Props) {
  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        Timeline
      </h3>

      {logs.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No activity found.
        </p>
      )}

      {logs.map((log) => (

        <div
          key={log.id}
          className="rounded-lg border p-4"
        >

          <div className="flex items-center justify-between">

            <p className="font-medium">
              {log.action}
            </p>

            <span className="text-xs text-muted-foreground">
              {new Date(
                log.created_at
              ).toLocaleString()}
            </span>

          </div>

          {log.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {log.description}
            </p>
          )}

        </div>

      ))}

    </div>
  );
}