"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Order,

  OrderDialog,

  OrdersTable,

  OrderService,

} from "@/features/orders";

import {

  InvoiceData,

  InvoicePreviewDialog,

  ShareInvoiceDialog,

  useInvoicePrint,

} from "@/features/invoice";

import {

  InvoicePdfService,

} from "@/features/invoice/services/InvoicePdfService";

import {

  Button,

} from "@/components/ui/button";

interface Props {

  basePath: string;

  permissions: {

    canCreate: boolean;

    canEdit: boolean;

    canDelete: boolean;

  };

}

export default function OrdersPage2({

  basePath,

  permissions,

}: Props) {

  /*
  ---------------------------------------
  Invoice Print
  ---------------------------------------
  */

  const {

    invoiceRef,

    print,

  } = useInvoicePrint();

  /*
  ---------------------------------------
  Orders
  ---------------------------------------
  */

  const [

    orders,

    setOrders,

  ] = useState<Order[]>([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    dialogOpen,

    setDialogOpen,

  ] = useState(false);

  const [

    selectedOrder,

    setSelectedOrder,

  ] = useState<Order | null>(null);

  /*
  ---------------------------------------
  Invoice
  ---------------------------------------
  */

  const [

    invoice,

    setInvoice,

  ] = useState<InvoiceData | null>(null);

  const [

    previewOpen,

    setPreviewOpen,

  ] = useState(false);

  const [

    shareOpen,

    setShareOpen,

  ] = useState(false);

  /*
  ---------------------------------------
  Load Orders
  ---------------------------------------
  */

  async function loadOrders() {

    try {

      setLoading(true);

      const data =

        await OrderService.getAll();

      setOrders(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadOrders();

  }, []);

  /*
  ---------------------------------------
  Create
  ---------------------------------------
  */

  function handleCreate() {

    setSelectedOrder(null);

    setDialogOpen(true);

  }

  /*
  ---------------------------------------
  Edit
  ---------------------------------------
  */

  function handleEdit(

    order: Order

  ) {

    setSelectedOrder(order);

    setDialogOpen(true);

  }

  /*
  ---------------------------------------
  Delete
  ---------------------------------------
  */

  async function handleDelete(

    order: Order

  ) {

    const confirmed = confirm(

      `Delete Order #${order.order_number}?`

    );

    if (!confirmed) {

      return;

    }

    try {

      await OrderService.delete(

        order.id

      );

      await loadOrders();

    } catch (e) {

      if (e instanceof Error) {

        alert(e.message);

      }

    }

  }

  /*
  ---------------------------------------
  Order Created
  ---------------------------------------
  */

  function handleOrderCreated(

    orderId: string,

    invoice?: InvoiceData,

  ) {

    loadOrders();

    if (invoice) {

      setInvoice(invoice);

      setPreviewOpen(true);

    }

  }

  /*
  ---------------------------------------
  Loading
  ---------------------------------------
  */

  if (loading) {

    return (

      <div className="p-6">

        Loading orders...

      </div>

    );

  }

  /*
  ---------------------------------------
  UI
  ---------------------------------------
  */

  return (

    <>

      <div className="space-y-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">

              Orders

            </h1>

            <p className="text-muted-foreground">

              Manage customer orders.

            </p>

          </div>

          {permissions.canCreate && (

            <Button

              onClick={handleCreate}

            >

              Create Order

            </Button>

          )}

        </div>

        <OrdersTable

          orders={orders}

          basePath={basePath}

          permissions={{

            canEdit:

              permissions.canEdit,

            canDelete:

              permissions.canDelete,

          }}

          onEdit={handleEdit}

          onDelete={handleDelete}

        />

        {permissions.canCreate && (

          <OrderDialog

            open={dialogOpen}

            order={selectedOrder}

            onOpenChange={setDialogOpen}

            onSuccess={loadOrders}

            onCreated={handleOrderCreated}

          />

        )}

      </div>

      {/* =====================================
          Invoice Preview
      ====================================== */}

      {invoice && (

        <InvoicePreviewDialog

          open={previewOpen}

          invoice={invoice}


          onOpenChange={setPreviewOpen}

          onPrint={print}

          onDone={print}

          onDownload={async () => {

            try {

              console.log(

                "Downloading Invoice..."

              );

              await InvoicePdfService.download(

                invoice

              );

            } catch (error) {

              console.error(

                "Download Failed",

                error

              );

            }

          }}

          onWhatsapp={async () => {

            try {

              console.log(

                "Sharing Invoice..."

              );

              await InvoicePdfService.share(

                invoice

              );

            } catch (error) {

              console.error(

                "Share Failed",

                error

              );

            }

          }}

          

        />

      )}

            {/* =====================================
          Share Dialog
      ====================================== */}

      {invoice && (

        <ShareInvoiceDialog

          open={shareOpen}

          invoice={invoice}

          invoiceRef={invoiceRef}

          onOpenChange={setShareOpen}

          onPrint={print}

          onDownload={async () => {

            try {

              console.log(

                "Downloading Invoice From Share Dialog..."

              );

              await InvoicePdfService.download(

                invoice

              );

            } catch (error) {

              console.error(

                "Download Failed",

                error

              );

            }

          }}

          onWhatsapp={async () => {

            try {

              console.log(

                "Sharing Invoice From Share Dialog..."

              );

              await InvoicePdfService.share(

                invoice

              );

            } catch (error) {

              console.error(

                "Share Failed",

                error

              );

            }

          }}

        />

      )}

    </>

  );

}