import { requireRole } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ManufacturerPage() {
  const user = await requireRole("manufacturer");

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.name}
        </h1>

        <p className="text-muted-foreground">
          Manage production workflow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}