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

      {/* =====================================
          HEADER
      ====================================== */}

      <CardHeader className="px-4 py-4 sm:px-6">

        <CardTitle className="text-base sm:text-lg">

          Order Workflow

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5 px-4 pb-4 sm:space-y-8 sm:px-6 sm:pb-6">

        {/* =====================================
            PROGRESS
        ====================================== */}

        <div className="flex w-full items-start">

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

              const completed =
                index <
                currentIndex;

              return (

                <div
                  key={step.key}
                  className="flex min-w-0 flex-1 items-start"
                >

                  {/* ---------------------------------
                      Step
                  ---------------------------------- */}

                  <div className="flex min-w-0 flex-col items-center">

                    <div
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border-2

                        sm:h-10
                        sm:w-10
                        
                        ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-background text-muted-foreground"
                        }
                      `}
                    >

                      {active ? (

                        <Icon
                          className="
                            h-3.5
                            w-3.5
                            sm:h-4
                            sm:w-4
                          "
                        />

                      ) : (

                        <Circle
                          className="
                            h-3.5
                            w-3.5
                            sm:h-4
                            sm:w-4
                          "
                        />

                      )}

                    </div>

                    <span
                      className="
                        mt-1
                        max-w-[58px]
                        truncate
                        text-center
                        text-[9px]
                        font-medium
                        leading-tight

                        sm:mt-2
                        sm:max-w-none
                        sm:text-xs
                      "
                    >

                      {step.label}

                    </span>

                  </div>

                  {/* ---------------------------------
                      Connector
                  ---------------------------------- */}

                  {index !==
                    STEPS.length - 1 && (

                    <div
                      className={`
                        mt-4
                        h-0.5
                        min-w-[6px]
                        flex-1
                        rounded-full

                        sm:mx-2
                        sm:mt-5
                        sm:h-1

                        ${
                          completed
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

        {/* =====================================
            STATUS
        ====================================== */}

        <div className="rounded-lg border p-4 sm:p-5">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <p className="text-xs text-muted-foreground sm:text-sm">

                Current Status

              </p>

              <h3 className="mt-1 text-lg font-bold capitalize sm:text-xl">

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

            <Badge className="shrink-0 text-xs">

              {order.order_number}

            </Badge>

          </div>

          {/* =====================================
              PENDING
          ====================================== */}

          {order.status ===
            "pending" && (

            <div className="mt-5 space-y-4">

              <div>

                <Label className="text-sm">

                  Estimated Days

                </Label>

                <Input
                  className="mt-2 h-9 w-full sm:w-40"
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

          {/* =====================================
              ACCEPTED
          ====================================== */}

          {order.status ===
            "accepted" && (

            <div className="mt-4 rounded-md bg-muted p-3 text-xs leading-relaxed sm:p-4 sm:text-sm">

              Inventory has already been reserved.

              <br />

              Start manufacturing when production begins.

            </div>

          )}

          {/* =====================================
              MANUFACTURING
          ====================================== */}

          {order.status ===
            "manufacturing" && (

            <div className="mt-4 rounded-md bg-muted p-3 text-xs leading-relaxed sm:p-4 sm:text-sm">

              Complete the manufacturing checklist.

              <br />

              Once everything is finished, mark the order as completed.

            </div>

          )}

          {/* =====================================
              COMPLETED
          ====================================== */}

          {order.status ===
            "completed" && (

            <div className="mt-4 rounded-md bg-muted p-3 text-xs leading-relaxed sm:p-4 sm:text-sm">

              Manufacturing has finished.

              <br />

              Move the order to Ready For Dispatch.

            </div>

          )}

          {/* =====================================
              READY
          ====================================== */}

          {order.status ===
            "ready_for_dispatch" && (

            <div className="mt-4 rounded-md border border-green-300 bg-green-50 p-3 sm:p-4">

              <p className="text-sm font-medium text-green-700">

                Order is ready for dispatch.

              </p>

            </div>

          )}

          {/* =====================================
              ACTION
          ====================================== */}

          {action && (

            <Button
              className="
                mt-5
                w-full
                sm:w-auto
              "
              size="default"
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