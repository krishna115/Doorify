import {

  InvoiceData,

  InvoiceDoor,

  InvoicePayment,

  InvoiceCustomization,

} from "../types";

import {

  OrderDetails,

} from "@/features/orders";

export class InvoiceService {

  /*
  ---------------------------------------
  Build Invoice
  ---------------------------------------
  */

  static build(

    details: OrderDetails

  ): InvoiceData {

    /*
    ---------------------------------------
    Doors
    ---------------------------------------
    */

    const doors: InvoiceDoor[] =

      details.order.doors.map(

        (door) => {

          const area =

            (
              door.width *
              door.height
            ) / 144;

          const total =

            area *

            door.quantity *

            Number(
              details.order.price_per_sqft
            );

          return {

            name:
              door.name,

            width:
              door.width,

            height:
              door.height,

            quantity:
              door.quantity,

            area,

            pricePerSqft:
              Number(
                details.order.price_per_sqft
              ),

            total,

          };

        }

      );

    /*
    ---------------------------------------
    Customizations
    ---------------------------------------
    */

    const customizations:
      InvoiceCustomization[] =

      details.customizations.map(

        (item) => ({

          id:
            item.id,

          name:
            item.instruction,

          image:
            item.image,

          selected:
            true,

        })

      );

    /*
    ---------------------------------------
    Addons
    ---------------------------------------
    */

    const addons =

      details.order.addons ?? [];

    const addonsTotal =

      addons.reduce(

        (
          total,
          addon
        ) =>

          total +

          Number(
            addon.amount
          ),

        0

      );

    /*
    ---------------------------------------
    Payment
    ---------------------------------------
    */

    const subtotal =

      doors.reduce(

        (
          total,
          door
        ) =>

          total +

          door.total,

        0

      );

    const payment:
      InvoicePayment = {

      pricePerSqft:
        Number(
          details.order.price_per_sqft
        ),

      subtotal,

      addons,

      addonsTotal,

      discount:
        Number(
          details.order.discount ?? 0
        ),

      total:
        Number(
          details.order.total_amount
        ),

      advance: 0,
        // Number(
        //   details.order.advance_amount ?? 0
        // ),

      remaining:

        Number(
          details.order.total_amount
        )
        //  -

        // Number(details.order.advance_amount ?? 0)
        

    };

    /*
    ---------------------------------------
    Invoice
    ---------------------------------------
    */

    return {

      order:
        details.order,

      customer: {

        name:
          details.order.customer_name,

        phone:
          details.order.customer_phone,

      },

      salesperson: {

        id: "",
        //   details.order.created_by,

        name:
          "",

      },

      doors,

      customizations,

      payment,

      options: {

        showCustomer: true,

        showPhone: true,

        showSalesperson: true,

        showOrderNumber: true,

        showDate: true,

        showPriceBreakdown: true,

        showCustomizations: true,

        showCustomizationImages: true,

        showAddons: true,

        showDiscount: true,

        showAdvance: true,

      },

    };

  }

}