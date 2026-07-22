"use client";

import { useEffect, useState } from "react";

import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
  UserRole,
  UserService,
} from "..";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  user?: User | null;

  onSuccess?: () => void;
}

export function UserDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: Props) {
  const isEdit = !!user;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] =
    useState<UserRole>("sales");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRole("sales");
    }
  }, [user, open]);

  async function handleSave() {
    try {
      setLoading(true);

      if (!name || !email) {
        alert("Please fill all required fields.");
        return;
      }

      if (!isEdit && password.length < 6) {
        alert("Password should be at least 6 characters.");
        return;
      }

      if (isEdit) {
        const request: UpdateUserRequest = {
          id: user!.id,
          name,
          email,
          role,
        };

        if (password.trim()) {
          request.password = password;
        }

        await UserService.update(request);
      } else {
        const request: CreateUserRequest = {
          name,
          email,
          password,
          role,
        };

        await UserService.create(request);
      }

      onOpenChange(false);

      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit User"
              : "Add User"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">
            <Label>Name</Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              {isEdit
                ? "New Password (Optional)"
                : "Password"}
            </Label>

            <Input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">

            <Label>Role</Label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(value as UserRole)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="admin">
                  Admin
                </SelectItem>

                <SelectItem value="sales">
                  Sales
                </SelectItem>

                <SelectItem value="manufacturer">
                  Manufacturer
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleSave}
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update User"
              : "Create User"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}