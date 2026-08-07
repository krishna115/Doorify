"use client";

import { User } from "..";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

interface Props {
  users: User[];

  onEdit: (user: User) => void;

  onDelete: (user: User) => void;
}

export function UsersTable({
  users,
  onEdit,
  onDelete,
}: Props) {

  return (

    <>

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden md:block">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Name
              </TableHead>

              <TableHead>
                Email
              </TableHead>

              <TableHead>
                Role
              </TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {users.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>

              </TableRow>

            )}

            {users.map((user) => (

              <TableRow key={user.id}>

                <TableCell className="font-medium">
                  {user.name}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>

                  <Badge variant="secondary">
                    {user.role}
                  </Badge>

                </TableCell>

                <TableCell className="space-x-2 text-right">

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onEdit(user)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      onDelete(user)
                    }
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>


      {/* =====================================================
          MOBILE CARDS
      ====================================================== */}

      <div className="space-y-3 md:hidden">

        {users.length === 0 && (

          <div className="rounded-lg border py-10 text-center text-sm text-muted-foreground">

            No users found.

          </div>

        )}

        {users.map((user) => (

          <div
            key={user.id}
            className="rounded-xl border bg-background p-4"
          >

            {/* ---------------------------------------------
                User Information
            ---------------------------------------------- */}

            <div className="flex items-start justify-between gap-3">

              <div className="min-w-0">

                <p className="truncate font-semibold">

                  {user.name}

                </p>

                <p className="mt-1 break-all text-xs text-muted-foreground">

                  {user.email}

                </p>

              </div>

              <Badge
                variant="secondary"
                className="shrink-0 text-[10px] capitalize"
              >

                {user.role}

              </Badge>

            </div>


            {/* ---------------------------------------------
                Actions
            ---------------------------------------------- */}

            <div className="mt-4 flex gap-2">

              <Button
                size="sm"
                variant="outline"
                className="h-9 flex-1"
                onClick={() =>
                  onEdit(user)
                }
              >

                Edit

              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="h-9 flex-1"
                onClick={() =>
                  onDelete(user)
                }
              >

                Delete

              </Button>

            </div>

          </div>

        ))}

      </div>

    </>

  );

}