"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

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

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {

  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

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

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    role,
    setRole,
  ] = useState<UserRole>("sales");

  /*
  -----------------------------------------
  Reset / Load User
  -----------------------------------------
  */

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

    setShowPassword(false);

  }, [
    user,
    open,
  ]);

  /*
  -----------------------------------------
  Save
  -----------------------------------------
  */

  async function handleSave() {

    try {

      setLoading(true);

      if (
        !name.trim() ||
        !email.trim()
      ) {

        alert(
          "Please fill all required fields."
        );

        return;

      }

      if (
        !isEdit &&
        password.length < 6
      ) {

        alert(
          "Password should be at least 6 characters."
        );

        return;

      }

      /*
      ---------------------------------------
      Edit User
      ---------------------------------------
      */

      if (isEdit) {

        const request: UpdateUserRequest = {

          id: user!.id,

          name: name.trim(),

          email: email.trim(),

          role,

        };

        if (
          password.trim()
        ) {

          request.password =
            password;

        }

        await UserService.update(
          request
        );

      }

      /*
      ---------------------------------------
      Create User
      ---------------------------------------
      */

      else {

        const request: CreateUserRequest = {

          name: name.trim(),

          email: email.trim(),

          password,

          role,

        };

        await UserService.create(
          request
        );

      }

      onOpenChange(false);

      onSuccess?.();

    } catch (error) {

      if (
        error instanceof Error
      ) {

        alert(
          error.message
        );

      } else {

        alert(
          "Something went wrong."
        );

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

      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-lg
          rounded-xl
          p-5
          sm:p-6
        "
      >

        {/* =====================================
            Header
        ====================================== */}

        <DialogHeader>

          <DialogTitle className="text-xl">

            {isEdit
              ? "Edit User"
              : "Add User"}

          </DialogTitle>

        </DialogHeader>

        {/* =====================================
            Form
        ====================================== */}

        <div className="space-y-5">

          {/* -----------------------------------
              Name
          ----------------------------------- */}

          <div className="space-y-2">

            <Label
              htmlFor="user-name"
            >
              Name
            </Label>

            <Input
              id="user-name"
              value={name}
              disabled={loading}
              placeholder="Enter name"
              className="h-11"
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

          </div>

          {/* -----------------------------------
              Email
          ----------------------------------- */}

          <div className="space-y-2">

            <Label
              htmlFor="user-email"
            >
              Email
            </Label>

            <Input
              id="user-email"
              type="email"
              value={email}
              disabled={loading}
              placeholder="Enter email"
              className="h-11"
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          {/* -----------------------------------
              Password
          ----------------------------------- */}

          <div className="space-y-2">

            <Label
              htmlFor="user-password"
            >

              {isEdit
                ? "New Password (Optional)"
                : "Password"}

            </Label>

            <div className="relative">

              <Input
                id="user-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                disabled={loading}
                placeholder={
                  isEdit
                    ? "Leave blank to keep current password"
                    : "Enter password"
                }
                className="h-11 pr-11"
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                tabIndex={-1}
                disabled={loading}
                onClick={() =>
                  setShowPassword(
                    (prev) =>
                      !prev
                  )
                }
                className="
                  absolute
                  right-0
                  top-0
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-r-md
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                  disabled:pointer-events-none
                  disabled:opacity-50
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (

                  <EyeOff
                    className="h-4 w-4"
                  />

                ) : (

                  <Eye
                    className="h-4 w-4"
                  />

                )}

              </button>

            </div>

            {isEdit && (

              <p className="text-xs text-muted-foreground">

                Leave this blank if you do
                not want to change the password.

              </p>

            )}

          </div>

          {/* -----------------------------------
              Role
          ----------------------------------- */}

          <div className="space-y-2">

            <Label>
              Role
            </Label>

            <Select
              value={role}
              disabled={loading}
              onValueChange={(value) =>
                setRole(
                  value as UserRole
                )
              }
            >

              <SelectTrigger
                className="
                  h-11
                  w-full
                "
              >

                <SelectValue
                  placeholder="Select role"
                />

              </SelectTrigger>

              <SelectContent>

                <SelectItem
                  value="admin"
                  className="py-3"
                >

                  <span className="font-medium">
                    Admin
                  </span>

                </SelectItem>

                <SelectItem
                  value="sales"
                  className="py-3"
                >

                  <span className="font-medium">
                    Sales
                  </span>

                </SelectItem>

                <SelectItem
                  value="manufacturer"
                  className="py-3"
                >

                  <span className="font-medium">
                    Manufacturer
                  </span>

                </SelectItem>

              </SelectContent>

            </Select>

          </div>

        </div>

        {/* =====================================
            Footer
        ====================================== */}

        <DialogFooter
          className="
            mt-2
            flex-col-reverse
            gap-2
            sm:flex-row
            sm:justify-end
          "
        >

          <Button
            type="button"
            variant="outline"
            disabled={loading}
            className="w-full sm:w-auto"
            onClick={() =>
              onOpenChange(false)
            }
          >

            Cancel

          </Button>

          <Button
            type="button"
            disabled={loading}
            className="w-full sm:w-auto"
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