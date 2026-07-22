"use client";

import { useEffect, useState } from "react";

import {
  User,
  UserDialog,
  UserService,
  UsersTable,
} from "@/features/users";

import { Button } from "@/components/ui/button";

export default function UsersPage() {

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  async function loadUsers() {
    try {

      setLoading(true);

      const data =
        await UserService.getAll();

      setUsers(data);

    } catch (error) {

      if (error instanceof Error) {
        alert(error.message);
      }

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(
    user: User
  ) {

    const confirmed = confirm(
      `Delete ${user.name}?`
    );

    if (!confirmed) return;

    try {

      await UserService.delete(user.id);

      loadUsers();

    } catch (error) {

      if (error instanceof Error) {
        alert(error.message);
      }

    }

  }

  return (
    <div className="space-y-6 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="text-muted-foreground">
            Manage Doorify users
          </p>

        </div>

        <Button
          onClick={() => {

            setSelectedUser(null);

            setDialogOpen(true);

          }}
        >
          Add User
        </Button>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <UsersTable
          users={users}
          onEdit={(user) => {

            setSelectedUser(user);

            setDialogOpen(true);

          }}
          onDelete={handleDelete}
        />

      )}

      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
        onSuccess={loadUsers}
      />

    </div>
  );
}