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
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Name</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Role</TableHead>

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
              className="text-center py-10 text-muted-foreground"
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

            <TableCell className="text-right space-x-2">

              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(user)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(user)}
              >
                Delete
              </Button>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>
  );
}