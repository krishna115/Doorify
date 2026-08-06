"use client";

import {
  CheckCircle2,
  Circle,
  Hammer,
  Package,
  Truck,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import { Order } from "../..";

interface Props {

  order: Order;

  estimatedDays: number;

  onEstimatedDaysChange: (
    value: number
  ) => void;

  onAction: () => void;

}

const STEPS = [

  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
  },

  {
    key: "accepted",
    label: "Accepted",
    icon: CheckCircle2,
  },

  {
    key: "manufacturing",
    label: "Manufacturing",
    icon: Hammer,
  },

  {
    key: "completed",
    label: "Completed",
    icon: Package,
  },

  {
    key: "ready_for_dispatch",
    label: "Ready",
    icon: Truck,
  },

];

export function OrderWorkflowCard({

  order,

  estimatedDays,

  onEstimatedDaysChange,

  onAction,

}: Props) {

  const currentIndex =
    STEPS.findIndex(
      step =>
        step.key ===
        order.status
    );

  function getActionLabel() {

    switch (order.status) {

      case "pending":
        return "Accept Order";

      case "accepted":
        return "Start Manufacturing";

      case "manufacturing":
        return "Mark Completed";

      case "completed":
        return "Ready For Dispatch";

      default:
        return null;

    }

  }

  const action =
    getActionLabel();

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Order Workflow

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-8">

        {/* -------------------------------- */}
        {/* Progress */}
        {/* -------------------------------- */}

        <div className="flex items-center justify-between">

          {STEPS.map(

            (
              step,
              index
            ) => {

              const Icon =
                step.icon;

              const active =
                index <=
                currentIndex;

              return (

                <div
                  key={step.key}
                  className="flex flex-1 items-center"
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`
                      flex h-12 w-12 items-center justify-center rounded-full border-2
                      ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted bg-background text-muted-foreground"
                      }
                    `}
                    >

                      {active ? (

                        <Icon className="h-5 w-5" />

                      ) : (

                        <Circle className="h-5 w-5" />

                      )}

                    </div>

                    <span className="mt-2 text-xs font-medium">

                      {step.label}

                    </span>

                  </div>

                  {index !==
                    STEPS.length - 1 && (

                    <div
                      className={`
                      h-1 flex-1 mx-2 rounded-full
                      ${
                        index <
                        currentIndex
                          ? "bg-primary"
                          : "bg-muted"
                      }
                    `}
                    />

                  )}

                </div>

              );

            }

          )}

        </div>

        {/* -------------------------------- */}
        {/* Status */}
        {/* -------------------------------- */}

        <div className="rounded-lg border p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">

                Current Status

              </p>

              <h3 className="text-xl font-bold mt-1">

                {order.status
                  .replaceAll(
                    "_",
                    " "
                  )
                  .replace(
                    /\b\w/g,
                    c =>
                      c.toUpperCase()
                  )}

              </h3>

            </div>

            <Badge>

              {order.order_number}

            </Badge>

          </div>

          {order.status ===
            "pending" && (

            <div className="mt-6 space-y-4">

              <div>

                <Label>

                  Estimated Days

                </Label>

                <Input
                  className="mt-2 w-40"
                  type="number"
                  min={1}
                  value={
                    estimatedDays === 0
                      ? ""
                      : estimatedDays
                  }
                  onChange={e =>
                    onEstimatedDaysChange(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

            </div>

          )}

          {order.status ===
            "accepted" && (

            <div className="mt-5 rounded-md bg-muted p-4 text-sm">

              Inventory has already been reserved.

              <br />

              Start manufacturing when production begins.

            </div>

          )}

          {order.status ===
            "manufacturing" && (

            <div className="mt-5 rounded-md bg-muted p-4 text-sm">

              Complete the manufacturing checklist.

              Once everything is finished,

              mark the order as completed.

            </div>

          )}

          {order.status ===
            "completed" && (

            <div className="mt-5 rounded-md bg-muted p-4 text-sm">

              Manufacturing has finished.

              Move the order to Ready For Dispatch.

            </div>

          )}

          {order.status ===
            "ready_for_dispatch" && (

            <div className="mt-5 rounded-md bg-green-50 border border-green-300 p-4">

              <p className="font-medium text-green-700">

                Order is ready for dispatch.

              </p>

            </div>

          )}

          {action && (

            <Button
              className="mt-6"
              size="lg"
              onClick={onAction}
            >

              {action}

            </Button>

          )}

        </div>

      </CardContent>

    </Card>

  );

}